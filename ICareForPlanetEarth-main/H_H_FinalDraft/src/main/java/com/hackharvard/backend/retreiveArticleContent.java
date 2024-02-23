package com.hackharvard.backend;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import java.io.IOException;
import java.net.URL;
import java.util.Scanner;

public class retreiveArticleContent {
    private String articleText;

    public retreiveArticleContent(String articleUrl) {
        this.articleText = getArticleText(articleUrl);
    }

    private String getArticleText(String url) {
        //url = url.substring(url.indexOf(": ") + 2);
        //url = url.split("\n")[1].trim();
        //System.out.println(url);
        StringBuilder articleText = new StringBuilder();
        try {
            // Open a connection to the URL and create a Scanner to read its content
            URL articleUrl = new URL(url);
            Scanner scanner = new Scanner(articleUrl.openStream(), "UTF-8");

            // Read the content of the article
            while (scanner.hasNextLine()) {
                articleText.append(scanner.nextLine());
            }
            // Parse the HTML content using Jsoup to extract text
            Document document = Jsoup.parse(articleText.toString());
            articleText.setLength(0); // Clear the StringBuilder
            // Extract text from the parsed HTML document
            articleText.append(document.text());
            // Close the scanner
            scanner.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return articleText.toString();
    }

    public String getArticleText() {
        return articleText;
    }

    // You can add additional methods or getters/setters as needed.
}