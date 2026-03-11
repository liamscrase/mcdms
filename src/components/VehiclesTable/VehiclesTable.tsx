import React, { useRef, useCallback, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import {
  chevronDownOutline,
  chevronUpOutline,
  chevronBackOutline,
  chevronForwardOutline,
  reorderFourOutline,
  listOutline,
  pricetagOutline,
  clipboardOutline,
  addOutline,
  ellipsisHorizontalOutline,
  heartOutline,
  checkmarkSharp,
} from 'ionicons/icons';
import './VehiclesTable.scss';

type ViewMode = 'list' | 'card';

interface VehicleRow {
  stockNo: string;
  year: string;
  makeModel: string;
  style: string;
  colour: string;
  vin: string;
  regNo: string;
  engine: string;
  transmission: string;
  odometer: string;
  status: string;
  statusDays: string;
  dealership: string;
  price: string;
  sale: string;
  opps: string;
  subtitle: string;
  fullPrice: string;
  attributes: string;
  attributesSub: string;
  statusSub: string;
  fuelType: string;
  model: string;
  owner: string;
  selected: boolean;
}

const PAGE_SIZE = 24;

const MAKES_MODELS = [
  { make: 'Nissan', model: 'Leaf 30X Thanks Edition Extra Cool' },
  { make: 'Honda', model: 'Fit' },
  { make: 'Mazda', model: 'Demio' },
  { make: 'Toyota', model: 'Corolla' },
  { make: 'Toyota', model: 'Camry' },
  { make: 'Ford', model: 'Ranger' },
  { make: 'Mitsubishi', model: 'ASX' },
  { make: 'Hyundai', model: 'Tucson' },
  { make: 'Kia', model: 'Sportage' },
  { make: 'Subaru', model: 'Outback' },
  { make: 'Volkswagen', model: 'Golf' },
  { make: 'BMW', model: '320i' },
  { make: 'Mercedes-Benz', model: 'C200' },
  { make: 'Holden', model: 'Commodore' },
  { make: 'Suzuki', model: 'Swift' },
  { make: 'Nissan', model: 'X-Trail' },
  { make: 'Mazda', model: 'CX-5' },
  { make: 'Honda', model: 'CR-V' },
  { make: 'Toyota', model: 'RAV4' },
  { make: 'Ford', model: 'Focus' },
  { make: 'Hyundai', model: 'i30' },
  { make: 'Kia', model: 'Cerato' },
  { make: 'Mazda', model: '3' },
  { make: 'Subaru', model: 'Impreza' },
  { make: 'Toyota', model: 'Yaris' },
  { make: 'Nissan', model: 'Qashqai' },
  { make: 'Volkswagen', model: 'Tiguan' },
  { make: 'BMW', model: 'X3' },
  { make: 'Audi', model: 'A4' },
  { make: 'Skoda', model: 'Octavia' },
];
const STYLES = ['Hatchback', 'HB', 'Sedan', 'SUV', 'Wagon', 'Ute', 'Van'];
const COLOURS = ['Metallic Silver', 'White', 'Silver', 'Black', 'Blue', 'Red', 'Grey', 'Pearl', 'Green', 'Navy'];
const STATUSES = ['On yard', 'In transit', 'In progress', 'Sold', 'Reserved'];
const DEALERSHIPS = ['AK', 'WLG', 'CHC', 'HAM', 'DUN', 'AUK'];
const ENGINES = ['Auto', 'L4', 'V6', 'L3', 'Electric'];
const TRANSMISSIONS = ['Manual', 'Auto', 'CVT', 'DCT'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

function makeVehicleRow(
  stockNo: string,
  year: string,
  makeModel: string,
  style: string,
  colour: string,
  status: string,
  statusDays: string,
  dealership: string,
  price: string,
  opps: string,
  selected: boolean
): VehicleRow {
  const subtitle = `#${stockNo} · ${dealership} · ${colour} · VIN:${stockNo.slice(-5)} · ${price}`;
  return {
    stockNo,
    year,
    makeModel,
    style,
    colour,
    vin: `...${stockNo.slice(-5)}`,
    regNo: `${['A', 'B', 'C', 'X', 'Y', 'Z'][+stockNo % 6]}${String(+stockNo).slice(0, 3)}${+stockNo % 100}`,
    engine: ENGINES[+stockNo % ENGINES.length],
    transmission: TRANSMISSIONS[+stockNo % TRANSMISSIONS.length],
    odometer: `${+stockNo * 1234} miles`,
    status,
    statusDays,
    dealership,
    price,
    sale: '',
    opps,
    subtitle,
    fullPrice: `$${Math.round(+price.replace(/[$,]/g, '') * 1.1).toLocaleString()}`,
    attributes: '69,000 incl...',
    attributesSub: 'Pearl · AZE0-12435',
    statusSub: 'In progress',
    fuelType: FUEL_TYPES[+stockNo % FUEL_TYPES.length],
    model: style,
    owner: 'Single',
    selected,
  };
}

const SAMPLE_ROWS: VehicleRow[] = [
  makeVehicleRow('54346', '2017', 'Nissan Leaf 30X Thanks Edition Extra Cool', 'Hatchback', 'Metallic Silver', 'On yard', '6', 'AK', '$19,999', '12', true),
  makeVehicleRow('54347', '2018', 'Honda Fit', 'HB', 'White', 'In transit', '3', 'AK', '$52,000', '8', true),
  makeVehicleRow('54348', '2019', 'Mazda Demio', 'HB', 'Silver', 'On yard', '12', 'WLG', '$48,500', '5', false),
  ...Array.from({ length: 30 }, (_, i) => {
    const id = 54349 + i;
    const mm = MAKES_MODELS[i % MAKES_MODELS.length];
    return makeVehicleRow(
      String(id),
      String(2016 + (i % 9)),
      `${mm.make} ${mm.model}`,
      STYLES[i % STYLES.length],
      COLOURS[i % COLOURS.length],
      STATUSES[i % STATUSES.length],
      String((i % 14) + 1),
      DEALERSHIPS[i % DEALERSHIPS.length],
      `$${(18000 + i * 1200 + (i % 5) * 5000).toLocaleString()}`,
      String((i % 15) + 1),
      i % 4 === 0
    );
  }),
];

function RowMoreBtn() {
  return (
    <div className="vehicles-table__more-cell">
      <div className="vehicles-table__hover-actions">
        <div className="vehicles-table__hover-actions-shadow" />
        <div className="vehicles-table__hover-actions-buttons">
          <button type="button" className="vehicles-table__action-btn" aria-label="Tag">
            <IonIcon icon={pricetagOutline} />
          </button>
          <button type="button" className="vehicles-table__action-btn" aria-label="Clipboard">
            <IonIcon icon={clipboardOutline} />
          </button>
          <button type="button" className="vehicles-table__action-btn" aria-label="Add">
            <IonIcon icon={addOutline} />
          </button>
        </div>
      </div>
      <button type="button" className="vehicles-table__action-btn" aria-label="More options">
        <IonIcon icon={ellipsisHorizontalOutline} />
      </button>
    </div>
  );
}

interface MobileCardRowProps {
  row: VehicleRow;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
}

function MobileCardRow({ row, isExpanded, isSelected, onToggleExpand, onToggleSelect }: MobileCardRowProps) {
  return (
    <div className={`m-card${isExpanded ? ' m-card--expanded' : ''}`}>
      <div className="m-card__top">
        <button
          type="button"
          className={`m-card__thumb${isSelected ? ' m-card__thumb--selected' : ''}`}
          onClick={onToggleSelect}
          aria-label={isSelected ? 'Deselect' : 'Select'}
        >
          {isSelected && (
            <span className="m-card__check">
              <IonIcon icon={checkmarkSharp} />
            </span>
          )}
        </button>

        <div className="m-card__info">
          <div className="m-card__text">
            {isExpanded ? (
              <>
                <span className="m-card__title">{row.year} {row.makeModel}</span>
                <span className="m-card__price">{row.price}</span>
              </>
            ) : (
              <>
                <span className="m-card__title">{row.year} {row.makeModel}</span>
                <span className="m-card__sub">{row.subtitle}</span>
                <div className="m-card__badges">
                  <span className="m-card__status-badge">
                    <span className="m-card__status-dot" />
                    {row.status}
                  </span>
                  <span className="m-card__opps-badge">
                    <IonIcon icon={heartOutline} />
                    {row.opps}
                  </span>
                </div>
              </>
            )}
          </div>
          <button type="button" className="m-card__icon-btn" onClick={onToggleExpand} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
            <IonIcon icon={isExpanded ? chevronUpOutline : chevronDownOutline} />
          </button>
          <button type="button" className="m-card__icon-btn" aria-label="More options">
            <IonIcon icon={ellipsisHorizontalOutline} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="m-card__details">
            <div className="m-card__detail">
              <span className="m-card__detail-label">Style</span>
              <span className="m-card__detail-value">{row.style}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Engine</span>
              <span className="m-card__detail-value">{row.engine}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Transmission</span>
              <span className="m-card__detail-value">{row.transmission}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Fuel Type</span>
              <span className="m-card__detail-value">{row.fuelType}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Color</span>
              <span className="m-card__detail-value">{row.colour}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Model</span>
              <span className="m-card__detail-value">{row.model}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Year</span>
              <span className="m-card__detail-value">{row.year}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Mileage</span>
              <span className="m-card__detail-value">{row.odometer}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Owner</span>
              <span className="m-card__detail-value">{row.owner}</span>
            </div>
            <div className="m-card__detail">
              <span className="m-card__detail-label">Price</span>
              <span className="m-card__detail-value">{row.price}</span>
            </div>
          </div>
          <div className="m-card__actions">
            <button type="button" className="m-card__btn m-card__btn--primary">View</button>
            <button type="button" className="m-card__btn m-card__btn--secondary">Sell</button>
          </div>
        </>
      )}
    </div>
  );
}

const VehiclesTable: React.FC = () => {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<ViewMode>('list');
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    () => new Set(SAMPLE_ROWS.filter(r => r.selected).map(r => r.stockNo))
  );

  const totalCount = SAMPLE_ROWS.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const paginatedRows = SAMPLE_ROWS.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalCount);

  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const toggleSelect = (stockNo: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(stockNo)) next.delete(stockNo);
      else next.add(stockNo);
      return next;
    });
  };

  const tableRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el) return;
    const scrolledLeft = el.scrollLeft > 0;
    const scrolledRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
    el.classList.toggle('vehicles-table--scrolled-left', scrolledLeft);
    el.classList.toggle('vehicles-table--scrolled-right', scrolledRight);
  }, []);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll, viewMode]);

  return (
    <div className="vehicles-table-wrapper">
      <div className="vehicles-table__toolbar">
        <div className="vehicles-table__toolbar-left">
          <button type="button" className="vehicles-table__selected-btn">
            {selectedRows.size} selected
            <IonIcon icon={chevronDownOutline} />
          </button>
          <span className="vehicles-table__count">{totalCount} results</span>
        </div>
        <div className="vehicles-table__toolbar-right">
          {viewMode === 'card' && (
            <div className="vehicles-table__sort-by">
              <span className="vehicles-table__sort-label">Sort by:</span>
              <button type="button" className="vehicles-table__sort-btn">
                Stock no <IonIcon icon={chevronDownOutline} />
              </button>
            </div>
          )}
          <div className="vehicles-table__view-switch">
            <button
              type="button"
              className={`vehicles-table__view-btn${viewMode === 'card' ? ' vehicles-table__view-btn--active' : ''}`}
              aria-pressed={viewMode === 'card'}
              aria-label="Card view"
              onClick={() => setViewMode('card')}
            >
              <IonIcon icon={reorderFourOutline} />
            </button>
            <button
              type="button"
              className={`vehicles-table__view-btn${viewMode === 'list' ? ' vehicles-table__view-btn--active' : ''}`}
              aria-pressed={viewMode === 'list'}
              aria-label="List view"
              onClick={() => setViewMode('list')}
            >
              <IonIcon icon={listOutline} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop / tablet table ── */}
      <div ref={tableRef} className={`vehicles-table vehicles-table--${viewMode} vehicles-table--desktop`}>
        {viewMode === 'list' ? (
          <>
            <div className="vehicles-table__header">
              <div className="vehicles-table__cell vehicles-table__cell--pinned">
                <input type="checkbox" aria-label="Select all" />
                <span className="vehicles-table__cell-spacer" />
                <span className="vehicles-table__pinned-label">Stock No</span>
              </div>
              <div className="vehicles-table__cell vehicles-table__cell--sortable">Year <IonIcon icon={chevronDownOutline} /></div>
              <div className="vehicles-table__cell">Make/Model</div>
              <div className="vehicles-table__cell">Style</div>
              <div className="vehicles-table__cell">Colour</div>
              <div className="vehicles-table__cell">Vin/Chassis</div>
              <div className="vehicles-table__cell">Reg No</div>
              <div className="vehicles-table__cell">Engine</div>
              <div className="vehicles-table__cell">Transmission</div>
              <div className="vehicles-table__cell">Odometer</div>
              <div className="vehicles-table__cell">Status</div>
              <div className="vehicles-table__cell">Status Days</div>
              <div className="vehicles-table__cell">Dealership</div>
              <div className="vehicles-table__cell">Retail/Sold Price</div>
              <div className="vehicles-table__cell">Sale</div>
              <div className="vehicles-table__cell">Opps</div>
              <RowMoreBtn />
            </div>
            {paginatedRows.map((row) => (
              <div
                key={row.stockNo}
                className={`vehicles-table__row${hoveredRow === row.stockNo ? ' vehicles-table__row--hovered' : ''}`}
                onMouseEnter={() => setHoveredRow(row.stockNo)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="vehicles-table__cell vehicles-table__cell--pinned">
                  <input type="checkbox" checked={selectedRows.has(row.stockNo)} onChange={() => toggleSelect(row.stockNo)} aria-label={`Select ${row.stockNo}`} />
                  <div className="vehicles-table__thumb" />
                  <span className="vehicles-table__stock-no">{row.stockNo}</span>
                </div>
                <div className="vehicles-table__cell">{row.year}</div>
                <div className="vehicles-table__cell">{row.makeModel}</div>
                <div className="vehicles-table__cell">{row.style}</div>
                <div className="vehicles-table__cell">{row.colour}</div>
                <div className="vehicles-table__cell">{row.vin}</div>
                <div className="vehicles-table__cell">{row.regNo}</div>
                <div className="vehicles-table__cell">{row.engine}</div>
                <div className="vehicles-table__cell">{row.transmission}</div>
                <div className="vehicles-table__cell">{row.odometer}</div>
                <div className="vehicles-table__cell">
                  <span className="vehicles-table__status">
                    <span className="vehicles-table__status-dot" />
                    {row.status}
                  </span>
                </div>
                <div className="vehicles-table__cell">{row.statusDays}</div>
                <div className="vehicles-table__cell">{row.dealership}</div>
                <div className="vehicles-table__cell">{row.price}</div>
                <div className="vehicles-table__cell">{row.sale}</div>
                <div className="vehicles-table__cell">{row.opps}</div>
                <RowMoreBtn />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="vehicles-table__header vehicles-table__header--card">
              <div className="vehicles-table__cell vehicles-table__cell--checkbox">
                <input type="checkbox" aria-label="Select all" />
                <span className="vehicles-table__cell-spacer vehicles-table__cell-spacer--card" />
              </div>
              <div className="vehicles-table__cell">Vehicle</div>
              <div className="vehicles-table__cell">Price</div>
              <div className="vehicles-table__cell">Attributes</div>
              <div className="vehicles-table__cell">Status</div>
              <div className="vehicles-table__cell">Opps</div>
              <RowMoreBtn />
            </div>
            {paginatedRows.map((row) => (
              <div
                key={row.stockNo}
                className={`vehicles-table__row vehicles-table__row--card${hoveredRow === row.stockNo ? ' vehicles-table__row--hovered' : ''}`}
                onMouseEnter={() => setHoveredRow(row.stockNo)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="vehicles-table__cell vehicles-table__cell--checkbox">
                  <input type="checkbox" checked={selectedRows.has(row.stockNo)} onChange={() => toggleSelect(row.stockNo)} aria-label={`Select ${row.stockNo}`} />
                  <div className="vehicles-table__thumb vehicles-table__thumb--card" />
                </div>
                <div className="vehicles-table__cell vehicles-table__cell--vehicle">
                  <span className="vehicles-table__vehicle-title">{row.year} {row.makeModel}</span>
                  <span className="vehicles-table__vehicle-sub">{row.subtitle}</span>
                </div>
                <div className="vehicles-table__cell vehicles-table__cell--price">{row.fullPrice}</div>
                <div className="vehicles-table__cell vehicles-table__cell--attrs">
                  <span className="vehicles-table__attrs-main">{row.attributes}</span>
                  <span className="vehicles-table__attrs-sub">{row.attributesSub}</span>
                </div>
                <div className="vehicles-table__cell vehicles-table__cell--card-status">
                  <span className="vehicles-table__status">
                    <span className="vehicles-table__status-dot" />
                    {row.status}
                  </span>
                  <span className="vehicles-table__status-sub">{row.statusSub}</span>
                </div>
                <div className="vehicles-table__cell vehicles-table__cell--card-opps">
                  <span className="vehicles-table__opps-badge">
                    <IonIcon icon={heartOutline} />
                    {row.opps}
                  </span>
                </div>
                <RowMoreBtn />
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── Mobile card view ── */}
      {viewMode === 'card' && (
        <div className="vehicles-table--mobile-card">
          {paginatedRows.map((row) => (
            <MobileCardRow
              key={row.stockNo}
              row={row}
              isExpanded={expandedRow === row.stockNo}
              isSelected={selectedRows.has(row.stockNo)}
              onToggleExpand={() => setExpandedRow(prev => prev === row.stockNo ? null : row.stockNo)}
              onToggleSelect={() => toggleSelect(row.stockNo)}
            />
          ))}
        </div>
      )}

      {/* ── Mobile list view (horizontal scroll) ── */}
      {viewMode === 'list' && (
        <div className="vehicles-table--mobile-list">
          <div className="vehicles-table--mobile-list__scroll">
            <div className="vehicles-table__header">
              <div className="vehicles-table__cell vehicles-table__cell--pinned">
                <input type="checkbox" aria-label="Select all" />
                <span className="vehicles-table__cell-spacer" />
                <span className="vehicles-table__pinned-label">Stock No</span>
              </div>
              <div className="vehicles-table__cell">Year</div>
              <div className="vehicles-table__cell">Make/Model</div>
              <div className="vehicles-table__cell">Style</div>
              <div className="vehicles-table__cell">Colour</div>
              <div className="vehicles-table__cell">Vin/Chassis</div>
              <div className="vehicles-table__cell">Reg No</div>
              <div className="vehicles-table__cell">Engine</div>
              <div className="vehicles-table__cell">Transmission</div>
              <div className="vehicles-table__cell">Odometer</div>
              <div className="vehicles-table__cell">Status</div>
              <div className="vehicles-table__cell">Status Days</div>
              <div className="vehicles-table__cell">Dealership</div>
              <div className="vehicles-table__cell">Price</div>
              <div className="vehicles-table__cell">Sale</div>
              <div className="vehicles-table__cell">Opps</div>
              <RowMoreBtn />
            </div>
            {paginatedRows.map((row) => (
              <div key={row.stockNo} className="vehicles-table__row">
                <div className="vehicles-table__cell vehicles-table__cell--pinned">
                  <input type="checkbox" checked={selectedRows.has(row.stockNo)} onChange={() => toggleSelect(row.stockNo)} aria-label={`Select ${row.stockNo}`} />
                  <div className="vehicles-table__thumb" />
                  <span className="vehicles-table__stock-no">{row.stockNo}</span>
                </div>
                <div className="vehicles-table__cell">{row.year}</div>
                <div className="vehicles-table__cell">{row.makeModel}</div>
                <div className="vehicles-table__cell">{row.style}</div>
                <div className="vehicles-table__cell">{row.colour}</div>
                <div className="vehicles-table__cell">{row.vin}</div>
                <div className="vehicles-table__cell">{row.regNo}</div>
                <div className="vehicles-table__cell">{row.engine}</div>
                <div className="vehicles-table__cell">{row.transmission}</div>
                <div className="vehicles-table__cell">{row.odometer}</div>
                <div className="vehicles-table__cell">
                  <span className="vehicles-table__status">
                    <span className="vehicles-table__status-dot" />
                    {row.status}
                  </span>
                </div>
                <div className="vehicles-table__cell">{row.statusDays}</div>
                <div className="vehicles-table__cell">{row.dealership}</div>
                <div className="vehicles-table__cell">{row.price}</div>
                <div className="vehicles-table__cell">{row.sale}</div>
                <div className="vehicles-table__cell">{row.opps}</div>
                <RowMoreBtn />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="vehicles-table__pagination" aria-label="Pagination">
        <span className="vehicles-table__pagination-info">
          Showing {startItem}–{endItem} of {totalCount}
        </span>
        <div className="vehicles-table__pagination-controls">
          <button
            type="button"
            className="vehicles-table__pagination-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            <IonIcon icon={chevronBackOutline} />
          </button>
          <span className="vehicles-table__pagination-page">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="vehicles-table__pagination-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            <IonIcon icon={chevronForwardOutline} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehiclesTable;
