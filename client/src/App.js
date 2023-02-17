import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [shortUrls, setShortUrls] = useState([{}]);
  const [url, setUrl] = useState("");

  // Hook to get title message
  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  // Hook to get saved urls
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => 
      setShortUrls(data.message));
  }, []);

  // Hook to get long url from short url and redirect
  useEffect(() => {
    const response = fetch("http://localhost:8000/:shortUrl", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({"shorturl": window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}),
      mode: 'cors'
    })
    response.then((res => res.json())).then(data => window.location.replace(data.message))
  }, []);

  // Hook to add long url and generate short url
  const handleSubmit = (event) => {
    fetch("http://localhost:8000/shortUrls", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({"fullurl": url}),
      mode: 'cors'
    })
  }
  
  return (
    
    <div className="container">
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" 
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" 
        crossorigin="anonymous">
      </link>
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <label for="fullUrl" className="sr-only">URL</label>
        <input required 
          type="url"
          name="fullUrl" 
          id="fullUrl" 
          placeholder="Insert your url here" 
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="form-control mr-2"/>
        <button type="submit" className="btn btn-primary">Shorten</button>
      </form>

      <table className="table table-striped table-dark table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Shortened URL</th>
          </tr>
        </thead>
        <tbody>
          { shortUrls.map(urlDetails => (
            <tr>
              <td>
                <a href={urlDetails.fullurl}>{urlDetails.fullurl}</a>
              </td>
              <td>
                <a href={urlDetails.shorturl}>{urlDetails.shorturl}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App