import React from 'react';
import ReactDOM from 'react-dom';

class New extends React.Component {
   myfunc=event=>{
     var el = event.target.parentNode.parentNode.parentNode.parentNode;
     if(el.id==='inc')

     el.remove();
  }
    render() {

      return(
        <div className="item clearfix " id={this.props.type}>
          <div className="item__description">{this.props.description}</div>
          <div className="right clearfix">
            <div className="item__value">{this.props.value}</div>
            <div className="item__delete">
              <button onClick = {this.myfunc} class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
          </div>
        </div>

      );
    }
}
// ReactDOM.render(<New />, 'income__list');
export default New;
