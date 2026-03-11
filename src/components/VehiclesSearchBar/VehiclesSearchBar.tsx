import React from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline, filterOutline, addOutline, closeOutline } from 'ionicons/icons';
import './VehiclesSearchBar.scss';

interface VehiclesSearchBarProps {
  activeFilter?: string;
  onClearFilters?: () => void;
}

/**
 * Search bar, filters button, add new button, and active filter chips.
 * Maps to Figma search + filters section.
 */
const VehiclesSearchBar: React.FC<VehiclesSearchBarProps> = ({
  activeFilter = 'Last activity: >2 weeks ago',
  onClearFilters,
}) => {
  return (
    <div className="vehicles-search-bar">
      <div className="vehicles-search-bar__row">
        <div className="vehicles-search-bar__input">
          <IonIcon icon={searchOutline} className="vehicles-search-bar__icon" />
          <span className="vehicles-search-bar__placeholder">Type / to search</span>
        </div>
        <button type="button" className="vehicles-search-bar__filters">
          <IonIcon icon={filterOutline} />
          <span>Filters</span>
          <span className="vehicles-search-bar__badge" aria-hidden />
        </button>
        <button type="button" className="vehicles-search-bar__add">
          <IonIcon icon={addOutline} />
          Add new
        </button>
      </div>
      {activeFilter && (
        <div className="vehicles-search-bar__chips">
          <div className="vehicles-search-bar__chip">
            <span>{activeFilter}</span>
            <IonIcon icon={closeOutline} />
          </div>
          <button type="button" className="vehicles-search-bar__clear" onClick={onClearFilters}>
            <IonIcon icon={closeOutline} />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesSearchBar;
