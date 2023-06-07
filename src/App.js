import HTMLFlipBook from "react-pageflip";
import React, { useState } from "react";
import "./App.css";
import Cursor from './Cursor';
import  axios  from "axios";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <h1 className="pad">{props.prompt}</h1>
      <img src={props.imgUrl} ></img>
      <p>{props.number}</p>
    </div>
  );
});


function MyAlbum(props) {
  const [inputText, setInputElement] = useState("");
  const [prmpts, setPrmpts] = useState([]);
  const [text, setText] = useState("ここに表示されます。");
  const printText = () => {
    setText(inputText);
    setInputElement("");
  };

  async function requestAPI(e){
    e.preventDefault();
    let input = document.getElementById("prompt").value;
    let imgSize = document.getElementById("size").value; 
    let body = {
      prompt: input,
      size: imgSize
    }
    let result = await axios.post("http://localhost:5001/openai/generateimage", body)
    console.log(result.data.data);
    let newValue = {
      imgUrl: result.data.data,
      prompt: input
    }
    console.log(newValue)
    setPrmpts(prevArray => [...prevArray, newValue])
    console.log(prmpts);
  };

  return (
    <body bgcolor="LightCyan">
      <div>
      <section className="showcase">
        <form id="image-form">
          <h1>Hayalindeki Masalı Resimlendir</h1>
          <div className="form-control">
            <input type="text" id="prompt" placeholder="Metin Giriniz" />
          </div>
          <div className="form-control">
            <select name="size" id="size">
              <option value="small">Küçük </option>
              <option value="medium" >Orta</option>
              <option value="large">Büyük</option>
            </select>
          </div>
          <button onClick={requestAPI} className="btn">OLUŞTUR</button>
        </form>
      </section>
        <br></br>
        <br></br>
        <HTMLFlipBook 
          id="flip-book"
          width={550}
          height={750}
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1350}
          showCover={true}
          
          flippingTime={1000}
          style={{ margin: "0 auto" }}
          maxShadowOpacity={0.5}
          className="album-web"
        >
          
          
        
          {prmpts.map((element, index) => (
             <Page key={"element" + index} {...element}></Page>

            // <p>{element.prompt}{element.imgUrl}</p>
          ))}
          
        
        
          
        </HTMLFlipBook>
        
      </div>
    </body>
  );
}

//function App() {
//  return (
//    <MyAlbum></MyAlbum>
//  );
//}

function App() {
  return (
    <>
      <MyAlbum />
      <Cursor />
    </>
  );
}

export default App;
