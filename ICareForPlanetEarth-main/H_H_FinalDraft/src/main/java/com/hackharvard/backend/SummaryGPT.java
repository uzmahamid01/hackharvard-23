package com.hackharvard.backend;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.json.JSONObject;

public class SummaryGPT {

   public static String chatGPT(String prompt) {
       String url = "https://api.openai.com/v1/chat/completions";
       String apiKey = "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";
       String model = "gpt-3.5-turbo";
       int maxTokens = 500;
       String cleanedPrompt = prompt.replace("\"", "");
       try {
           URL obj = new URL(url);
           HttpURLConnection connection = (HttpURLConnection) obj.openConnection();
           connection.setRequestMethod("POST");
           connection.setRequestProperty("Content-Type", "application/json");
           connection.setRequestProperty("Authorization", "Bearer " + apiKey);

           String prePrompt = "[{\"role\": \"user\", \"content\": \"" + cleanedPrompt + "\"}]";
           String body = "{\"model\": \"" + model + "\", \"messages\": " + prePrompt + ", \"max_tokens\": " + maxTokens + "}";

           // The request body 
           // String body = "{\"model\": \"" + model + "\", \"messages\": [{\"role\": \"user\", \"content\": \"" + prompt + "\"}], \"max_tokens\": " + maxTokens + "}";
           connection.setDoOutput(true);
           OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
           writer.write(body);
           writer.flush();
           writer.close();
           // Response from ChatGPT
           BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
           String line;
           StringBuffer response = new StringBuffer();
           while ((line = br.readLine()) != null) {
               response.append(line);
           }
           br.close();
           // calls the method to extract the message.
           return extractMessageFromJSONResponse(response.toString());
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }

   public static String extractMessageFromJSONResponse(String response) {
       int start = response.indexOf("content")+ 11;
       int end = response.indexOf("\"", start);
       return response.substring(start, end);
   }

   public static String escapeStringForJson(String unescapedString) {
    return JSONObject.quote(unescapedString);
}

   public static String runGPT() throws IOException {
    String content = new String(Files.readAllBytes(Paths.get("src/ArticleSummaryText.txt")));
    //String systemPrompt = "Summarize the following article into a well-written one-liner that starts with the name of the region. The tone of writing should evoke feelings of concern, impact, profoundness relevance, and importance: it should resemble the style of {location}: {short summary of the news article }   ";
    String systemPrompt = "Summarize the following article ";
    String prompt = systemPrompt + content;
    // System.out.println("here's the prompt: " + prompt);
    System.out.println(chatGPT(escapeStringForJson(prompt)));
    return chatGPT(escapeStringForJson(prompt));
   }
}



