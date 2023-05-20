import HTMLFlipBook from "react-pageflip";
import React, { useState } from "react";
import "./App.css";

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
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
});

function MyAlbum(props) {
  const [inputText, setInputElement] = useState("");
  const [text, setText] = useState("ここに表示されます。");
  const printText = () => {
    setText(inputText);
    setInputElement("");
  };

  return (
    <body bgcolor="LightCyan">
      <div>
      <section class="showcase">
        <form id="image-form">
          <h1>Hayalindeki Masalı Resimlendir</h1>
          <div class="form-control">
            <input type="text" id="prompt" placeholder="Metin Giriniz" />
          </div>
          <div class="form-control">
            <select name="size" id="size">
              <option value="small">Küçük </option>
              <option value="medium" selected>Orta</option>
              <option value="large">Büyük</option>
            </select>
          </div>
          <button type="submit" class="btn">OLUŞTUR</button>
        </form>
      </section>
        <br></br>
        <br></br>
        <HTMLFlipBook
          width={550}
          height={650}
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
          <PageCover>try</PageCover>
          <PageCover></PageCover>
          <Page number="1">
          <img src="/logo512.png"></img>
          </Page>
          <Page number="2">
            <img src="/logo512.png"></img>
          </Page>
          <Page number="3">
          <img src="/logo512.png"></img>
          </Page>
          <Page number="4">
          <img src="/logo512.png"></img>
          </Page>
          <PageCover></PageCover>
          <PageCover>see you</PageCover>
        </HTMLFlipBook>
        
      </div>
    </body>
  );
}

function App() {
  return (
    <MyAlbum></MyAlbum>
  );
}

export default App;
