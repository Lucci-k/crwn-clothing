import React from 'react';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import { firestore, convertCollectionsSnapshopToMap } from '../../firebase/firebase.utils';
import { collection, query, getDocs } from 'firebase/firestore';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection.component';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const { updateCollections } = this.props;
    const q = query(collection(firestore, 'collections'));
    const querySnapshot = await getDocs(q);
    const collectionsMap = convertCollectionsSnapshopToMap(querySnapshot);
    updateCollections(collectionsMap);
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
