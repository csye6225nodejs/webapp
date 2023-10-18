packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.7"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "artifact" {
  default = "" # Set your default value
}

variable "region" {
  default = "us-east-2"
}

variable "instance_type" {
  default = "t2.micro"
}

source "amazon-ebs" "debian" {
  ami_name      = "debian-12-ami-{{timestamp}}"
  instance_type = var.instance_type
  region        = var.region
  ami_users     = ["908593341105", "064412371858"]
  source_ami_filter {
    filters = {
      "virtualization-type" = "hvm"
      "architecture"        = "x86_64"
      "name"                = "debian-12*"
      "root-device-type"    = "ebs"
    }
    most_recent = true
    owners      = ["amazon"] # Debian 12.0 is owned by the official Debian AMI account
  }
  ssh_username = "admin"
}

build {
  name    = "webapp"
  sources = ["source.amazon-ebs.debian"]

  provisioner "file" {
    source      = "${var.artifact}"
    destination = "tmp/webapp.zip"
  }



  provisioner "shell" {

    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1"
    ]

    script = "install-app-dependencies.sh" # Point to your shell script file
  }

}
