package com.hackharvard.backend;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Article {
    @JsonProperty("source")
    private Source source;

    @JsonProperty("author")
    private String author;

    @JsonProperty("title")
    private String title;

    @JsonProperty("desciption")
    private String description;

    @JsonProperty("url")
    private String url;

    @JsonProperty("urlToImage")
    private String urlToImage;

    @JsonProperty("publishAt")
    private String publishedAt;

    @JsonProperty("content")
    private String content;


    public void getArticleInfo() {

        System.out.println(url + "\n");
        System.out.println(title + "\n" );
        //System.out.println(description + "\n" );//
        System.out.println(content + "\n");
        System.out.println("\n" + "\n" + "\n" + "\n");

    }

    public String articleInfoToPass() {

        String ArticlesInfo = url +  "\n" + title  + "\n" + 
                
                                content + "\n" + 
                                "\n" + "\n" + "\n" + "\n";

        return ArticlesInfo;

    }

    
}
