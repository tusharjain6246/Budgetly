import React from 'react';
import { withLastLocation } from 'react-router-last-location';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
// import New from './New';
import ReactDOM from 'react-dom';

// import logo from './logo.svg';
import './App.css';
import { Link, withRouter } from "react-router-dom";
// const options =[{text:"increment", value:"increment"},{text:"decrement", value:"decrement"},]




class App extends React.Component {
  state={
    id:0,
    i: 0,
    month:'',
    finalIncome:0,
    finalExpense:0,
    finalBudget:0,
    username: '',
    errors:[],
    incrementOrdecrement:"",
    itemDescription:"",
    itemValue:0,
    incomeList:[],
    expenseList:[],
    load: false,

  }
  async componentDidMount() {
    // ReactDOM.render(<Car brand="Mustang"/>, 'income__list');

    // this.setState({id: this.props.match.params.id});
    console.log(this.state.incomeList);
    console.log(this.state.expenseList);

    var now, months, month, year, date;
    now = new Date();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();
        date = now.getDate();
        year = now.getFullYear();
        let fin = date+ " " + months[month] + " " + year;
        console.log(fin);
    this.setState({month: fin});
    try {
        let prom = await fetch(`http://localhost:3001/user/${this.props.match.params.id}`);
        if(prom.ok){
            let res = await prom.json();
            console.log(res.todos);
            this.setState({load: false,i: res.todos.i, username: res.todos.username, id: res.todos._id, finalBudget:res.todos.totalBudget, finalIncome:res.todos.totalIncome, finalExpense:res.todos.totalExpense});

            // console.log(items);
            // console.log(incomeItem);
            // console.log(expenseItem);

            this.setState({
                // incomeList:items.filter((item)=>item.type==='inc')
                incomeList: res.todos.incomeItems
            });
            this.setState({
                expenseList:res.todos.expenseItems
            });
        }
        else {
            let error;
            let errors = [];
            error = {message: "invalid username or password"};
            this.setState({errors:this.state.errors.concat(error),load: false});
          }
    } catch (err) {
        console.error(err);
        this.setState({errors:this.state.errors.concat(err),load: false});
    }
  };
  async componentDidUpdate(){
    console.log(this.state.incomeList);
    console.log(this.state.expenseList);
  }
  handleChange = event =>{
    this.setState({[event.target.name]: event.target.value});
  }
  handleSelectChange=(e,{value})=>this.setState({incrementOrdecrement:value});

  submitHandle =async event=>{
    event.preventDefault();
    // console.log(this.state.incomeList);
    // console.log(this.state.expenseList);
    console.log(this.state.incrementOrdecrement);
    var obj = {
      id: this.state.i,
      description: this.state.itemDescription,
      value:parseInt(this.state.itemValue),
      type: this.state.incrementOrdecrement,
    }
    this.setState({i: this.state.i + 1});
    // console.log(this.state.itemDescription);
    console.log(this.state.itemValue);
    if(this.state.incrementOrdecrement==="inc"){
      var budget = parseInt(this.state.finalBudget) + parseInt(this.state.itemValue);
      var income = parseInt(this.state.finalIncome) + parseInt(this.state.itemValue);
      // console.log(income);
       this.setState({finalIncome: income, finalBudget: budget});
       await this.setState(previousState =>({
         incomeList:[...previousState.incomeList, obj]
       }));

    }
    else {
      var budget = parseInt(this.state.finalBudget) - parseInt(this.state.itemValue);
      var expense = parseInt(this.state.finalExpense) + parseInt(this.state.itemValue);
      this.setState({finalExpense: expense, finalBudget: budget});
      await this.setState(previousState =>({
        expenseList:[...previousState.expenseList, obj]
      }));

    }

  }


    addToMemory = async()=>{

      const data = await {'_id': this.state.id,
                          "finalBudget":this.state.finalBudget,
                          "finalIncome": this.state.finalIncome,
                          "finalExpense": this.state.finalExpense,
                          "incomelist": this.state.incomeList,
                          "i": this.state.i,
                          "expenselist": this.state.expenseList};
      console.log(data);
      const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
      };
      try {
          let prom = await fetch('http://localhost:3001/add',options);
          if(prom.ok){
              let res = await prom.json();
              console.log(prom.status);
              console.log(res.todos._id);
              await this.setState({load: false, id: res.todos._id});
          }
          else {
              let error;
              let errors = [];
              error = {message: "email is already in use"};
              this.setState({errors:this.state.errors.concat(error),load: false});
            }
      } catch (err) {
          console.error(err);
          this.setState({errors:this.state.errors.concat(err),load: false});
      }
    };

        formatNumber = (num, type)=> {
              var numSplit, int, dec, type;
              var nums = [];
              for(var i in num){
                num = num[i];
              }
              // console.log(num);
                  // 2310.4567 -> + 2,310.46
              if(type===""){
                if(num>=0)
                  type= "inc";
                else {
                  type = "exp";
                }
              }

              num = Math.abs(num);
              num = num.toFixed(2);
              // console.log(num);
              numSplit = num.split('.');

              int = numSplit[0];
              // console.log(int);
              if (int.length > 3) {
                  int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //23510 - 23,510
              }

              dec = numSplit[1];

              return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

          };
          delete=event=>{
            var el = event.target.parentNode.parentNode.parentNode.parentNode;
            console.log(el);
            var des = el.childNodes[0].innerText;
            var val = parseInt(el.childNodes[1].childNodes[0].innerText);
            console.log(val + " " + des);
            console.log("hey" +  el.id);
            console.log(el.className);

            if(el.className.includes('inc')){

              var budget = parseInt(this.state.finalBudget) - val;
              var income = parseInt(this.state.finalIncome) - val;
              this.setState({finalIncome: income, finalBudget: budget});
              var b = this.state.incomeList.filter(item=>item.id !=el.id);

              this.setState({ incomeList: b});

            }
            else if(el.className.includes('exp')){
              var budget = parseInt(this.state.finalBudget) + val;
              var expense = parseInt(this.state.finalExpense) - val;
              this.setState({finalExpense: expense, finalBudget: budget});
              // var b = this.state.expenseList.filter(item=>item.description===des &&  item.value ==val);
              var b = this.state.expenseList.filter(item=>item.id!=el.id);
              this.setState({expenseList: b});
            }
         }

  render(){
    const {incomeList, expenseList,username,month, finalIncome, finalExpense, finalBudget, incrementOrdecrement,itemDescription,itemValue, load} = this.state;

    const mystyle = {
      fontSize:"25px",
      background: "none",
      border: "none",
      color: "#28B9B5",
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      lineHeight: "1.1",
      marginLeft: "10px",
      padding: "0"
    }


  return (
    <div className="App">
      <div className="top">
          <div className="budget">
              <div className = "username">Welcome  {username}</div>
              <Button className = "save_btn" onClick={this.addToMemory}  size="large"><Link to="/login">SAVE</Link></Button>

              <div className="budget__title">
                  Available Budget till : {month}
              </div>

              <div className="budget__value">{this.formatNumber({finalBudget}, "")}</div>

              <div className="budget__income clearfix">
                  <div className="budget__income--text">Income</div>
                  <div className="right">
                      <div className="budget__income--value">{this.formatNumber({finalIncome},"inc")}</div>
                  </div>
              </div>

              <div className="budget__expenses clearfix">
                  <div className="budget__expenses--text">Expenses</div>
                  <div className="right clearfix">
                      <div className="budget__expenses--value">{this.formatNumber({finalExpense}, "exp")}</div>
                  </div>
              </div>
          </div>
        </div>
        <div className="add">
          <div className="add__container">
            <Form style={{display: "inline-block"}} onSubmit={this.submitHandle} size = "large">
             <Form.Group inline>

                <Form.Select placeholder="select type" onChange ={this.handleSelectChange}
                    options={[{key:"inc",text:"+", value:"inc"},{key:"exp",text:"-", value:"exp"}]}

                />
                 <Form.Input name= "itemDescription" icon= "heading" iconPosition = "left" placeholder = "add description" onChange = {this.handleChange} type = "text" value={itemDescription} />
                 <Form.Input name= "itemValue" icon= "inr" iconPosition = "left" placeholder = "value" onChange = {this.handleChange} type = "number"/>
                 <Button style={mystyle}  icon="check circle outline" size="large"></Button>

             </Form.Group>
             </Form>
            </div>
          </div>
          <div className="container clearfix">
                <div className="income">
                    <h2 className="icome__title">Income</h2>

                    <div className="income__list">
                    {incomeList.length>0 &&(
                        incomeList.map(item=>{
                          return (
                            <div className= {"item clearfix " + item.type} id={item.id}>
                              <div className="item__description">{item.description}</div>
                              <div className="right clearfix">
                                <div className="item__value">{item.value}</div>
                                <div className="item__delete">
                                  <button onClick={this.delete}  className="item__delete--btn"><i className="ion-ios-close-outline"></i></button>
                                </div>
                              </div>
                            </div>
                          )
                          // return <div>{this.news}</div>
                        })

                    )}
                    </div>
                </div>

                <div className="expenses">
                    <h2 className="expenses__title">Expenses</h2>

                    <div className="expenses__list">
                    {expenseList.length>0 &&(
                      expenseList.map(item=>{
                        return (
                          <div  className={"item clearfix " + item.type} id={item.id}>
                            <div className="item__description">{item.description}</div>
                            <div className="right clearfix">
                              <div className="item__value">{item.value}</div>
                              <div className="item__delete">
                                <button onClick={this.delete}  className="item__delete--btn"><i className="ion-ios-close-outline"></i></button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                    </div>
                </div>
            </div>
      </div>

  );
}
}


const withApp = withRouter(App);
export default  withLastLocation(withApp);
