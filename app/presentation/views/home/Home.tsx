import {ImageBackground, View, Image, Button} from "react-native";
import stylesHome from "./StyleHome";
import { XButton} from "../../components/XButton";
import {HeartButton} from "../../components/heartButton";


export function Home(){
    return (
      <View>
          <ImageBackground source={require("../../../../assets/background.png")}
                           style={{width: '100%', height: '100%'}}>
              <View style={stylesHome.logo}>
                 <Image source={require("../../../../assets/logo.png")} style={stylesHome.logo}></Image>
              </View>

                  <XButton></XButton>
                  <HeartButton></HeartButton>



          </ImageBackground>
      </View>
    );
}