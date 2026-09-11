import { useSelector, useDispatch } from 'react-redux';
import {
  // Task 7: Import the `removePhoto()` action creator from the photos slice
  removePhoto,
  // Task 13: Import the `selectFilteredPhotos()` selector from the photos slice
  selectFilteredPhotos,
  // Task 24: Import the `toggleFavorite()` action creator from the photos slice
  toggleFavorite,
  // Task 28: Import the `editPhotoCaption()` action creator from the photos slice
  editPhotoCaption,
} from '../photos.slice';
import './list.css';

export default function PhotosList() {
  // Task 14: Call `useSelector()` below with `selectFilteredPhotos` instead of `selectAllPhotos`
  const photos = useSelector(selectFilteredPhotos);
  // Task 8: Store a reference to the Redux store's dispatch method in a variable called `dispatch`
  const dispatch = useDispatch();

  function handleDeleteButtonClick(id) {
    // Task 9: Dispatch the `removePhoto()` action creator, passing in the id
    dispatch(removePhoto(id));
  }

  // Task 25: Create a `handleToggleFavorite()` function that dispatches the `toggleFavorite()` action with the photo id
  function handleToggleFavorite(id) {
    dispatch(toggleFavorite(id));
  }

  // Task 29: Create a `handleEditCaption()` function that dispatches the `editPhotoCaption()` action with id and newCaption
  function handleEditCaption(id, currentCaption) {
    const newCaption = window.prompt('Enter a new caption:', currentCaption);

    if (newCaption && newCaption.trim()) {
      dispatch(editPhotoCaption({ id, newCaption: newCaption.trim() }));
    }
  }

  const photosListItems = photos.map(({ id, caption, imageUrl, isFavorite }) => (
    <li key={id}>
      <img alt={caption} src={imageUrl} />
      <div>
        <p>{caption}</p>
        {/* Task 23: Add a button to toggle favorite status with data-testid={`${id}-favorite-button`} and call handleToggleFavorite() */}
        <button
          data-testid={`${id}-favorite-button`}
          onClick={() => handleToggleFavorite(id)}>
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
        <button
          data-testid={`${caption}-button`}
          onClick={() => handleDeleteButtonClick(id)}>
          Delete
        </button>
        <button
          data-testid={`${id}-edit-button`}
          onClick={() => handleEditCaption(id, caption)}>
          Edit Caption
        </button>
      </div>
    </li>
  ));

  return photosListItems.length > 0 ? (
    <ul>{photosListItems}</ul>
  ) : (
    <h3>No doggies to display...</h3>
  );
}
