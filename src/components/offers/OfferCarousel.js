import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
// import { Link } from "react-router-dom";
// import transformDate from "../../functions/dates"
import transformDate from "../../functions/dates"
import { Link } from "react-router-dom";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import '../../stylesheets/styles.css'



class OfferCarousel extends Component {

  state = {
    activeIndex: 0,
  }

  onExiting() {
		this.animating = false;
	}

	onExited() {
		this.animating = false;
	}

  next = () => {
    const items = this.props.offers;
    const { activeIndex } = this.state
    if (this.animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    const items = this.props.offers;
    const { activeIndex } = this.state
    if (this.animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    this.setState({ activeIndex: this.state.activeIndex });
  }

  onDelete = async (id) => {
    await this.next()
    this.props.deleteOffer(id)
  }

  render() {
    const items = this.props.offers;
    const { showEditOfferForm } = this.props;
    const offers = items.map((item) => {
      const from = transformDate(item.from)
      const until = transformDate(item.until)
      return (
        <CarouselItem
          key={item._id}
        >
          <CarouselCaption captionText={item.location} captionHeader={item.location} />
            <Link to={`/Offer/${item._id}`}>
              <h3>{item.location}</h3> 
              <p>Budget: {item.budget}</p>
              <p>From: {from}</p> 
              <p>Until: {until}</p> 
            </Link>
            <Button color="danger" onClick={()=>this.onDelete(item._id)}>Delete Offer</Button>{' '}
            <Button color="success" onClick={()=>showEditOfferForm(item)}>Edit Offer</Button>{' '}
        </CarouselItem>
      );
    });
    
    return (
      <Carousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}
        slide={false}
        interval={50000}
      >
        <CarouselIndicators items={offers} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
        {offers}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default withAuth(OfferCarousel);
