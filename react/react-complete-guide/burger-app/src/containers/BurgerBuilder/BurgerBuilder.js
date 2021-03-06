import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  getUpdatedPurchaseable = (ingredients) => {
    const numIngredients = Object.values(ingredients)
      .reduce((sum, val) => sum + val, 0);
    return numIngredients > 0;
  };

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const newCount = ingredients[type] + 1;
    const updatedIngredients = {
      ...ingredients,
      [type]: newCount,
    };
    const updatedTotalPrice = totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
      purchaseable: this.getUpdatedPurchaseable(updatedIngredients),
    });
  };

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    if (ingredients[type] <= 0) {
      return;
    }
    const newCount = ingredients[type] - 1;
    const updatedIngredients = {
      ...ingredients,
      [type]: newCount,
    };
    const updatedTotalPrice = totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
      purchaseable: this.getUpdatedPurchaseable(updatedIngredients),
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    alert('You continue!');
  };

  render() {
    const { ingredients, totalPrice, purchaseable, purchasing } = this.state;

    const disabledInfo = Object.keys(ingredients)
      .reduce((info, type) => Object.assign(info, { [type]: ingredients[type] <= 0 }), {});

    return (
      <Aux>
        <Modal
          show={purchasing}
          onClose={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            onPurchaseCancel={this.purchaseCancelHandler}
            onPurchaseContinue={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          price={totalPrice}
          purchaseable={purchaseable}
          onIngredientAdded={this.addIngredientHandler}
          onIngredientRemoved={this.removeIngredientHandler}
          onOrdered={this.purchaseHandler}
          disabledInfo={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
