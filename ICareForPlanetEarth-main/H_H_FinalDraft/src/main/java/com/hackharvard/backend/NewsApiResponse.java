package com.hackharvard.backend;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsApiResponse {

    @JsonProperty("status")
    private String status;

    @JsonProperty("totalResults")
    private int totalResults;

    @JsonProperty("articles")
    private List <Article> articles;

    public void getArticles () {

        for (Article i : articles) {
            i.getArticleInfo();
        }

    }

    public String articlesString () {

        StringBuilder listBuilder = new StringBuilder();
        int counter = 0;
       for (Article i: articles) {
            listBuilder.append(i.articleInfoToPass());
            counter++;
            if (counter>15) {break;}
            }
        String ArticlesInfoGPT = listBuilder.toString();

    

        try {
            // Create a BufferedWriter object wrapped around a FileWriter to write to the file
            BufferedWriter writer = new BufferedWriter(new FileWriter("src/ArticlesTest.txt"));

            // Write the string to the file
            writer.write(ArticlesInfoGPT);

            // Close the writer to save changes
            writer.close();

            //System.out.println("ArticleList successfully written to the file.");

        } catch (IOException e) {
            // Handle any potential IO exceptions here
            System.out.println("An error occurred: " + e.getMessage());
        }
        
        return ArticlesInfoGPT;
    
}
}