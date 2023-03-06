import './App.css';

function App() {

  var formdata = new FormData();
       formdata.append("title", "from REACT");
       formdata.append("user_id", "2345");
    
       var requestOptions = {
         method: 'POST',
         body: formdata,
         redirect: 'follow',
         changeOrigin: true,
         mode: "cors",
       };
  
    //Get Method
    const doECHO = () => {
      fetch("https://httpbin.org/post", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    };

    //Get Method
    const DoDebug = () => {
      fetch("http://[::1]:8438/prediction/debug/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    };
    
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World by gians!</p>
        <button onClick={doECHO}>ECHO from httpbin</button>
        <button onClick={DoDebug}>Call DEBUG</button>
      </header>
    </div>
  );
}

export default App;

