package com.hackharvard.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsOrgApiRequest {


private String locationName2;

public ResponseEntity<NewsApiResponse> getHeadlines(String locationName) {
    String url = "https://newsapi.org/v2/everything?q=" + locationName + " AND (climate change OR global warming)&from=2023-09-21&to=2023-10-22&apiKey=API_Key";
    RestTemplate restTemplate = new RestTemplate();
    NewsApiResponse newsApiResponse = restTemplate.getForObject(url, NewsApiResponse.class);

    newsApiResponse.articlesString();

    return ResponseEntity.ok(newsApiResponse);
}
@Autowired
public NewsOrgApiRequest(String locationName) {
    this.locationName2 = locationName;
}

}