import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  function onMessage(data) {
    let num1 = JSON.parse(data.nativeEvent.data).num1;
    let num2 = JSON.parse(data.nativeEvent.data).num2;
    let sum = parseInt(num1) + parseInt(num2);
    sendDataToWebView(sum);
  }

  function sendDataToWebView(total) {
    webviewRef.current.postMessage(total, '*');
  }

  const webviewRef = useRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center', marginBottom: 75}}>
        <TouchableOpacity
          onPress={() => sendDataToWebView('Mock Data')}
          style={{
            padding: 2,
            width: 300,
            marginTop: 100,
            backgroundColor: '#6751ff',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Send Data To Website
          </Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        source={{
          html: ` 
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              background-color: lightblue;
            "
          >
          <label for="num1">First Number: </label>
          <input type="number" id="num1" > 
          <label for="num2">Second Number: </label>
          <input type="number" id="num2" > 
          <h3 id="geeks"></h3>
            <button  
            onclick="sendDataToReactNativeApp()"
            style="
              padding: 20;
              width: 200;
              font-size: 20;
              color: white;
              background-color: #6751ff;
            "
          >
            Add
          </button>
            <script>
              const sendDataToReactNativeApp = async () => {
                let num1 = document.getElementById("num1").value; 
                let num2 = document.getElementById("num2").value; 
                const numbers = JSON.stringify({
                  num1: num1,
                  num2: num2,
                });
                window.ReactNativeWebView.postMessage(numbers);
              };
              document.addEventListener("message", message => {
                // alert(message.data)
                var demo = document.getElementById("geeks");
                demo.innerHTML = "Sum : " +  message.data;
              });

          
            </script>
          </body>
        </html>        
`,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
