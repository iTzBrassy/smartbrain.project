import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./App.css";


const {grpc} = require("clarifai-nodejs-grpc");
const service = require("clarifai-nodejs-grpc/proto/clarifai/api/service_pb");
const resources = require("clarifai-nodejs-grpc/proto/clarifai/api/resources_pb");
const {StatusCode} = require("clarifai-nodejs-grpc/proto/clarifai/api/status/status_code_pb");
const {V2Client} = require("clarifai-nodejs-grpc/proto/clarifai/api/service_grpc_pb");

const clarifai = new V2Client("api.clarifai.com", grpc.ChannelCredentials.createSsl());

const metadata = new grpc.Metadata();
metadata.set("authorization", "eaa584fedfc04701a5aed4a0c8abee94");

const particlesInit = async (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

const particlesLoaded = (container) => {
  console.log(container);
};



class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
    }
  }

  onInputChange = (e) => {
    console.log(e.target.value)
  }

  onButtonSubmit = () => {
    console.log('click')
    const request = new service.PostModelOutputsRequest();
// This is the model ID of a publicly available General model. You may use any other public or custom model ID.
request.setModelId("aaa03c23b3724a16a56b629203edc62c");
request.addInputs(
    new resources.Input()
        .setData(
            new resources.Data()
                .setImage(
                    new resources.Image()
                        .setUrl("https://samples.clarifai.com/dog2.jpeg")
                )
        )
)

clarifai.postModelOutputs(
    request,
    metadata,
    (error, response) => {
        if (error) {
            throw error;
        }

        if (response.getStatus().getCode() !== StatusCode.SUCCESS) {
            throw "Error: " + response.getStatus();
        }

        console.log("Predicted concepts, with confidence values:")
        for (const concept of response.getOutputsList()[0].getData().getConceptsList()) {
            console.log(concept.getName() + " " + concept.getValue());
        }
    }
)
   
  }

  render() {
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 10,
                },
                repulse: {
                  distance: 200,
                  duration: 0.0,
                },
              },
            },
            particles: {
              color: {
                value: "#4CA1AF",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
