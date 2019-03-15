import React, { Component } from 'react';
import {
  ToastAndroid,
  TextInput, Text,
  View,
  Animated,
  TouchableOpacity
} from 'react-native';
import Field from './components/Field';
import Obj from './components/Object'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateX: 0,
      animateY: 0,
      curX: 0,
      curV: 0,
      x: new Animated.Value(0),
      v: new Animated.Value(0),
      kecepatan: '',
      percepatan: ''
    }

    this.state.x.addListener(
      ({value}) => this.setState({ curX: value })
    );
    this.state.v.addListener(
      ({value}) => this.setState({ curV: value })
    );
  }

  run(v, a) {
    if(!this.validate(v, a)) return;

    v = parseInt(v);
    a = parseInt(a);

    const { outputX, outputV } = this.calculate(v, -a); // Percepatan harus diberi minus agar objek dapat berhenti
    
    this.setState({
      animateX: this.state.x.interpolate({
        inputRange: outputX, outputRange: outputX
      })
    })

    Animated.parallel([
      Animated.timing(this.state.x, {
        toValue: outputX[outputX.length-1],
        duration: 1000 * (outputX.length),
      }),
      Animated.timing(this.state.v, {
        toValue: 0,
        duration: 1000 * (outputV.length),
      }),
    ]).start(() => this.setState({ a: 0, v: 0 }));
  }

  validate(v, a) {
    if(v == '' || a == ''){
      ToastAndroid.show('Kecepatan dan percepatan tidak boleh kosong!', ToastAndroid.SHORT);
      return false;
    }else if(parseInt(v) <= parseInt(a)){
      ToastAndroid.show('Kecepatan harus lebih besar dari percepatan!', ToastAndroid.SHORT);
      return false;
    }
    
    return true;
  }
  calculate(v, a) { // Diterima input berupa kecepatan awal dan percepatan

    let x = 0, // Inisialisasi posisi X
        xt = 0,
        vt = 0,
        outputX = [0],
        outputV = [v];

    deltaT = 1; // Selisih waktu
    t = 0; // Waktu awal

    while(v > 0){ // Iterasi sampai kecepatan bernilai 0
      vt = v + (a * deltaT); // Hitung kecepatan selanjutnya
      xt = x + (vt * deltaT); // Hitung posisi baru
      outputX.push(xt);
      outputV.push(vt);
      
      x = xt;
      v = vt;
      t += deltaT; // Increment waktu sebanyak 1
    }
    
    console.log(outputV);
    outputX.pop(); outputV.pop();

    return { outputX, outputV };
  }

  render() {
    const { kecepatan, percepatan } = this.state;
    console.log(kecepatan);
    return (
        <Field>
          <View style={{flex: 1}}>
            <View style={{ flex: 1, justifyContent: 'flex-start', padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 16, color:'#000' }}>Kecepatan Awal (v)</Text>
                <TextInput
                  placeholder="Masukkan kecepatan awal"
                  keyboardType = 'numeric'
                  value={this.state.kecepatan}
                  onChangeText={v => this.setState({ kecepatan : v })}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 16, color:'#000' }}>Percepatan (a)</Text>
                <TextInput
                  placeholder="Masukkan percepatan"
                  keyboardType = 'numeric'
                  value={this.state.percepatan}
                  onChangeText={a => this.setState({ percepatan : a })}
                />
              </View>

              <TouchableOpacity 
                onPress={() => {
                  this.state.x.setValue(0);
                  this.run(kecepatan, percepatan);
                }} 
                style={{ width: 70, height: 30 , backgroundColor: 'grey', justifyContent: 'center', borderRadius: 4}}
              >
                <Text style= {{ alignSelf: 'center', color: '#FFF' }}>
                  Mulai
                </Text>
              </TouchableOpacity>
            </View>

            <Animated.View style={{ transform: [{ translateX: this.state.animateX }] }}>
              <Text style={{ color: 'black' }}>x: {parseFloat(this.state.curX).toFixed(4)}</Text>
              <Text style={{ color: 'black' }}>v: {parseFloat(this.state.curV).toFixed(4)}</Text>
              <Obj/>
            </Animated.View>
            <View style={{ height: 100, alignSelf: 'stretch', backgroundColor: 'black' }}/>
          </View>
        </Field>
    );
  }
}

export default App;
