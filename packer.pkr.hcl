packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.7"
      source  = "github.com/hashicorp/amazon"
    }
  }
}
variable "artifact" {}

source "amazon-ebs" "debian" {
  ami_name      = "debian-12-ami-{{timestamp}}"
  instance_type = "t2.micro"
  region        = "us-east-2"
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
    source      = var.artifact != null ? var.artifact : ""
    destination = "/home/admin/webapp.zip"
  }



  provisioner "shell" {
    script = "install-app-dependencies.sh" # Point to your shell script file
  }

}
