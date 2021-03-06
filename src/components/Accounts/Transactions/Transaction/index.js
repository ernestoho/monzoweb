import React from 'react';
import moment from 'moment';

export default class Transaction extends React.Component {
  render() {
    const {
      props: {
        amount,
        logo,
        merchant,
        id,
        transactionSelect,
        active,
        created,
        declinedReason,
        localAmount,
        counterParty,
        category
      }
    } = this;

    // This will change when I see more reasons!
    const formattedDeclinedReason = declinedReason === 'INSUFFICIENT_FUNDS' ? `Declined, you didn't have ${amount}` : false;

    let logoImage;

    if (logo) {
      logoImage = logo;
    } else {
      logoImage = require(`assets/${category}.svg`);
    }

    return (
      <a
        href="#"
        className={`collection-item avatar row ${active ? 'active' : ''}`}
        data-tid={id}
        onClick={transactionSelect}
      >
        <div className="col s10">
          <img src={logoImage} alt={merchant} className={`${!logo && 'category--'+category+'-bg'} rounded circle`} />
          <span className="title primary-text">{counterParty || merchant}{`${localAmount ? ' 🌎' : ''}`}</span>
          {
            formattedDeclinedReason ? (
              <p>{formattedDeclinedReason}</p>
            ) : (
              <p className="grey-text text-lighten-1">{moment(created).fromNow()}</p>
            )
          }
        </div>
        <div className="col s2">
          <p className={`secondary-content ${amount.includes('+') ? 'green-text' : 'black-text'}`} style={{fontSize: '1.5em'}}>
            {!formattedDeclinedReason ? amount : ''}
          </p>
        </div>
      </a>
    );
  }
}
