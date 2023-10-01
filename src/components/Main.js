import React, { Component } from 'react';
import Obama from '../Obama.jpg';
const {getEthPriceNow,getEthPriceHistorical}= require('get-eth-price');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {data: 0};
      }

    componentDidMount() {
        try {
            getEthPriceNow()
            .then( data => {
                console.log(data[new Date()].ETH.USD);
                    this.setState({data: data[new Date()].ETH.USD});
            })
        } catch {

        }
    }

    ethToUSD = (ethPrice) => {
        if (this.state.data) {
            return ethPrice*this.state.data;
        } else {
            return "...";
        }
    }

  render() {
    return (
      <div id="content">
        <h1>Add Allowance</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei((this.productPrice.value/this.state.data).toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Allowance Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Allowance Price (USD)"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Allowance</button>
        </form>
        <p>&nbsp;</p>
        <h2>Fund An Allowance</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Cost</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>~{this.ethToUSD(window.web3.utils.fromWei(product.price.toString(), 'Ether'))} USD ({ window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth)</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='d-flex justify-content-center'>
            <img src={Obama}/>
        </div>
      </div>
    );
  }
}

export default Main;
