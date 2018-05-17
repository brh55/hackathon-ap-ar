'use strict';

import React, { Component } from 'react';

import {StyleSheet, Text} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroBox,
  ViroARPlaneSelector,
  ViroPolyline,
  ViroSphere,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAmbientLight,
  ViroParticleEmitter
} from 'react-viro';


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      log: 'Log On'
    }; 

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    ViroARTrackingTargets.createTargets({
      "accesspoint" : {
        source: require('./res/access_point.png'),
        orientation : "Up",
        physicalWidth : 0.221 // real world width in meters
      },
      "access_point2" : {
        source: require('./res/accesspoint.jpg'),
        orientation : "Up",
        physicalWidth : 0.221 // real world width in meters
      },
      "daniel" : {
        source: require('./res/daniel.jpg'),
        orientation : "Up",
        physicalWidth: 0.10
      }
    });

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARImageMarker target={"accesspoint"} >
          <ViroAmbientLight color="#ffffff" />
          <Viro3DObject
              source={require("./res/wood_circle.obj")}
              position={[0, 1.25, 0]}
              scale={[.25, .25, .25]}
              rotation={[90, 0, 0]}
              opacity={.45}
              type="OBJ"/>
          <ViroBox position={[0, 3, 0]} scale={[.5, .5, .5]} />
          <ViroPolyline position={[0, 3, 0]} points={[[0,0,0], [0,-4,0]]} thickness={0.1} />
        </ViroARImageMarker>

        <ViroARImageMarker target={"access_point2"} >
          <ViroAmbientLight color="#ffffff" />
          <Viro3DObject
              source={require("./res/wood_circle.obj")}
              position={[0, 1.25, 0]}
              scale={[.25, .25, .25]}
              rotation={[90, 0, 0]}
              opacity={.45}
              type="OBJ"/>
          <ViroBox position={[0, 4, 0]} scale={[.5, .5, .5]} />
          <ViroPolyline position={[0, 4, 0]} points={[[0,0,0], [0,-4,0]]} thickness={0.1} />
        </ViroARImageMarker>
        <ViroARImageMarker target={"daniel"} >
          <ViroText
            text="Awesome!!!"
            scale={[.1,.1,.1]}
            position={[0,-.18,-.25]}
            rotation={[0, 1, 0]}
            style={styles.helloWorldTextStyle}
            />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // Tracking normal
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
