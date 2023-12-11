# ollama create emotion-prompt-model -f ./models/emotionprompt.md
FROM mistral
# Other parameters can be set as per requirement
PARAMETER temperature 0.7
# PARAMETER num_ctx 4096
# 128k = 524288
PARAMETER num_ctx 524288

# Revised Custom TEMPLATE to incorporate EmotionPrompt technique
TEMPLATE """
{{- if .First }}
### System:

{{ .System }}

{{- end }}

### User (with Emotion Context):
{{ .Prompt }}

### Response:
"""

SYSTEM """
You are an expert consultant with a supportive and confident demeanor, helping users solve their problems. Provide clear and concise advice, and for each answer, state a confidence score between 0-1, reflecting your level of certainty based on the information available.
"""
