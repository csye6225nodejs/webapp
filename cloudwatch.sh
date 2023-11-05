#!/bin/bash

# Define the JSON configuration as a heredoc
json_config=$(cat <<EOF
{
  "agent": {
    "metrics_collection_interval": 10,
    "logfile": "/var/logs/amazon-cloudwatch-agent.log"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/tomcat9/csye6225.log",
            "log_group_name": "csye6225",
            "log_stream_name": "webapp"
          }
        ]
      }
    },
    "log_stream_name": "cloudwatch_log_stream"
  },
  "metrics": {
    "metrics_collected": {
      "statsd": {
        "service_address": "8125",
        "metrics_collection_interval": 15,
        "metrics_aggregation_interval": 300
      }
    }
  }
}
EOF
)

# Use the configuration in the JSON variable as needed
echo "JSON Configuration:"
echo "$json_config"

# Other commands to set up CloudWatch Agent
