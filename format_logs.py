# ensure you have rich installed
# pip install rich

import sys
import json
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.pretty import Pretty

# Create a console object for rich output
console = Console()


def format_log_entry(log_entry):
    try:
        # Attempt to parse the log entry as JSON
        log_data = json.loads(log_entry)

        # Create a formatted log with colored text using Text()

        formatted_text = Text()

        level = log_data["level"]
        title = "[bold cyan]Log Entry"
        border_color = "cyan"  # Default border color

        if level == "ERROR":
            title = "[bold red]ERROR"
            border_color = "red"
        elif level == "WARNING" or level == "WARN":
            title = "[bold orange]WARNING"
            border_color = "orange"
        elif level == "INFO":
            title = "[bold blue]INFO"
            border_color = "blue"
        elif level == "DEBUG":
            title = "[bold magenta]DEBUG"
            border_color = "magenta"

        for key, value in log_data.items():
            if key == "level":
                continue
            formatted_text.append(f"{key}: {value}\n")

        formatted_log = Panel(
            formatted_text,
            title=title,
            border_style=border_color,
        )
        return formatted_log
    except Exception:
        # Handle other exceptions gracefully
        return Panel(
            Pretty(log_entry),
            title="INFO",
        )


def main():
    for line in sys.stdin:
        # Process and format each log entry
        formatted_log = format_log_entry(line.strip())
        console.print(formatted_log)


if __name__ == "__main__":
    main()
