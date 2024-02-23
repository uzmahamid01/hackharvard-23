package com.hackharvard.backend;
import java.io.FileWriter;
import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
       
       
       
        String countryName = "United States";
        NewsOrgApiRequest test = new NewsOrgApiRequest(countryName);
		test.getHeadlines(countryName);        
		SelectorGPT gptTest = new SelectorGPT();
        	try {
		String articleURL = gptTest.runGPT();
        //String newStr = articleURL.substring(0, articleURL.length() - 2);
        //System.out.println(articleURL);
		// creating an object of then executing method within the object to get the article as a string//
		retreiveArticleContent gettingArticle  = new retreiveArticleContent(articleURL);
		String articleText = gettingArticle.getArticleText();
        System.out.println(articleText);
        System.out.println();
         System.out.println();
		articleText = articleText.length() > 14000 ? articleText.substring(0, 14000) : articleText;

		String fileName = "src/ArticleSummaryText.txt";

        try {
            FileWriter writer = new FileWriter(fileName);
            writer.write(articleText);
            writer.close();
            //System.out.println("Successfully wrote article summary to file " + fileName);
        } catch (IOException e) {
            System.out.println("An error occurred while writing article summary to file " + fileName);
            e.printStackTrace();
        }
		// creating an object of SummaryGPT and executing method within the object to get the summary of the article//
		SummaryGPT summaryGPT = new SummaryGPT();
		String articleSummary = summaryGPT.runGPT();
		System.out.println(articleSummary);

        } catch (Exception e) {
            e.printStackTrace(); 
        }
	}
    @Bean
    	public static String countryName () {
        // Define your string value here, or load it from a configuration file or environment variable.
        return "you";
    }
public static void cleanTxtFile() {
 String filePath = "src/ArticlesTest.txt"; // Specify the file path here
        
        try {
            FileWriter fileWriter = new FileWriter(filePath);
            fileWriter.write(""); // Writing an empty string to the file
            fileWriter.close();
            System.out.println("Contents of the file have been deleted.");
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
}
}
