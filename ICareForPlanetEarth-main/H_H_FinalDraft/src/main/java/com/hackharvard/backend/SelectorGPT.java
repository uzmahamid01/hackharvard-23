package com.hackharvard.backend;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.json.JSONObject;

public class SelectorGPT {

   public static String chatGPT(String prompt) {
       String url = "https://api.openai.com/v1/chat/completions";
       String apiKey = "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";
       String model = "gpt-3.5-turbo";
       int maxTokens = 1000;
       String cleanedPrompt = prompt.replace("\"", "");
       try {
           URL obj = new URL(url);
           HttpURLConnection connection = (HttpURLConnection) obj.openConnection();
           connection.setRequestMethod("POST");
           connection.setRequestProperty("Content-Type", "application/json");
           connection.setRequestProperty("Authorization", "Bearer " + apiKey);

           //String prePrompt = "[{\"role\": \"user\", \"content\": \"" + cleanedPrompt + "\"}]";
           //String body = "{\"model\": \"" + model + "\", \"messages\": " + prePrompt + ", \"max_tokens\": " + maxTokens + "}";

           String body = String.format("{\"model\": \"%s\", \"messages\": [{\"role\": \"user\", \"content\": %s}], \"max_tokens\": %d}",
           model, JSONObject.quote(prompt), maxTokens);
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
    String content = new String(Files.readAllBytes(Paths.get("src/ArticlesTest.txt")));
    //String systemPrompt = "out of given options return one link that is relevant to Climate Change in https format";
    String systemPrompt = "out of given options return one link that is relevant to Climate Change and Extreme Weather, in https format : do not return anything else, just the url";
    String prompt = systemPrompt + content;
    //System.out.println(chatGPT(escapeStringForJson(prompt)));
    return chatGPT(escapeStringForJson(prompt));
   }
}