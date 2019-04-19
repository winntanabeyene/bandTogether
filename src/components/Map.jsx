import React from 'react'
import Axios from 'axios';


class Map extends React.Component{

constructor(props){
  super(props)

  this.state = {
    listings: [],
    centerOfUs: [39.8283, -98.5795]
  }

this.getCoordinates = this.getCoordinates.bind(this);
this.getMap = this.getMap.bind(this);
}



getMap(){

}


getCoordinates(){


}


render() {



  return(
    <div>
      Hello World!
    </div>
  )
}




}

export default Map;