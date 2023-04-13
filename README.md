# Digital Nomad News API

A webscraping API delivering recent headlines from the world of digital nomads.

## API Endpoints (REST):

<table>
 <thead>
    <tr>
      <th>Route</th>
      <th>Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/news</td>
      <td>GET</td>
    </tr>
    <tr>
      <td>/news/:id</td>
      <td>GET</td>
    </tr>
  </tbody>
</table>

## API Response

`GET /news`

Retreive all news articles in descending date order.

```json
[
  {
    "title": "Digital nomads example article",
    "url": "http://example.com/digital-nomad-example-article",
    "source": "Example Source",
    "date": "Mar 23, 2022"
  }
]
```

`GET /news/:id`

Retreive news articles from a single source in descending date order.

```json
[
  {
    "title": "Digital nomads example article",
    "url": "http://example.com/digital-nomad-example-article",
    "source": "Example Source Matching ID",
    "date": "Mar 23, 2022"
  }
]
```

## Article Properties

<table>
 <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>title</td>
      <td>string</td>
      <td>title of the article</td>
    </tr>
    <tr>
      <td>url</td>
      <td>string</td>
      <td>url of the article</td>
    </tr>
    <tr>
      <td>source</td>
      <td>string</td>
      <td>name of the publishing source</td>
    </tr>
    <tr>
      <td>date</td>
      <td>string</td>
      <td>MMM d, YYYY format of when the article was published</td>
    </tr>
  </tbody>
</table>

## Dependencies

- cheerio
- express
- axios
- jest
- supertest
