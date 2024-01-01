export class OllamaApi {
  constructor() {
    this.abortController = null;
  }

  async send(url, data, onResponse, onError, onDone) {
    const request = { data };
    try {
      const response = await this.postChatMessage(url, data);
      await this.handleResponse(request, response, onResponse, onDone);
    } catch (error) {
      onError(request, error);
    }
  }

  async postChatMessage(url, data) {
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    const response = await fetch(url, {
      signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`${url} failed with status ${response.status}`);
    }

    return response;
  }

  async handleResponse(request, response, onResponse, onDone) {
    const reader = response.body.getReader();
    let partialLine = '';
    var isRequestDone = false;

    while (!isRequestDone) {
      const { done, value } = await reader.read();
      if (done) {
        onDone(request, response);
        isRequestDone = true;
        continue;
      }

      const textChunk = new TextDecoder().decode(value);
      const lines = (partialLine + textChunk).split('\n');
      partialLine = lines.pop();

      lines.forEach((line) => {
        const responseData = JSON.parse(line);
        if (line.trim()) {
          // TODO: Move this line:
          this.printResponseStats(responseData);
          onResponse(request, responseData.message.content);
        }
      });
    }

    if (partialLine.trim()) {
      onResponse(request, partialLine);
    }
  }

  abort() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  printResponseStats(data) {
    if (!data.total_duration) {
      return;
    }
    // Convert nanoseconds to seconds for durations
    const totalDurationInSeconds = data.total_duration / 1e9;
    const loadDurationInSeconds = data.load_duration / 1e9;
    const promptEvalDurationInSeconds = data.prompt_eval_duration / 1e9;
    const responseEvalDurationInSeconds = data.eval_duration / 1e9;

    // Calculate tokens per second (token/s)
    const tokensPerSecond = data.eval_count / responseEvalDurationInSeconds;
    const output = `
Model: ${data.model}
Created At: ${data.created_at}
Total Duration (s): ${totalDurationInSeconds.toFixed(2)}
Load Duration (s): ${loadDurationInSeconds.toFixed(2)}
Prompt Evaluation Count: ${data.prompt_eval_count}
Prompt Evaluation Duration (s): ${promptEvalDurationInSeconds.toFixed(2)}
Response Evaluation Count: ${data.eval_count}
Response Evaluation Duration (s): ${responseEvalDurationInSeconds.toFixed(2)}
Tokens Per Second: ${tokensPerSecond.toFixed(2)} token/s
    `;
    console.log(output);
  }

  static getModels(url, onResponse) {
    if (!url) {
      return null;
    }

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch models from ${url}`);
        }
        return response.json();
      })
      .then((data) => {
        onResponse(data.models);
      })
      .catch((error) => {
        console.debug(error);
        console.error(
          `Please ensure the server is running at: ${url}. Error code: 39847`,
        );
        onResponse([]);
      });
  }
}
