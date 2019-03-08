import React, { Component } from 'react'
import '../Styles/home.css'
import { Link } from 'react-router-dom'
import Nombre from '../../Images/NombreBLANCO.png';
import ProductsGrid from '../Molecules/ProductsGrid';

class Home extends Component {
  state = {
    img: '',
    active: false,
    products: localStorage.products ? JSON.parse(localStorage.products) : []
  }

  openModal = (img) => {
    return () => {
      this.setState({
        img,
        active: true
      })
    }
  }

  render() {
    const { img, active, products } = this.state

    return (
      <main>
        <br />
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                <img src={Nombre} alt="Nombre" width="300" height="80" />
              </h1>
            </div>
          </div>
        </section>

        <br />

        <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
          <ul>
            <li className="is-active"><Link to='/'>All</Link></li>
            <li><Link to='/'>Drawings</Link></li>
            <li><Link to='/'>Tattoos</Link></li>
            <li><Link to='/'>Others</Link></li>
          </ul>
        </nav>

        <br />
        <section className="hero is-black">
          <div className="hero-body">
            <div className="container">
              <ProductsGrid products={products} click={this.openModal} />
              <div className={`modal ${active && 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                  <p className="image is-4by3">
                    <img src={img} alt="" />
                  </p>
                </div>
                <button className="modal-close is-large"
                  aria-label="close"
                  onClick={() => this.setState({ active: false })}></button>
              </div>
            </div>
          </div>
        </section>

      </main>
    )
  }
}

export default Home
