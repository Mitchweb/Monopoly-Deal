import React, { useState, Dispatch, SetStateAction } from 'react';
import { IPropertySet, IPropertyWildcard } from './interfaces';
import PropertyWildcard from '../Card/PropertyWildcard';
import SocketEvent from '../../helpers/SocketEvent';

interface IProps {
  setIsModalWildcardsHidden: Dispatch<SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  properties: IPropertySet[];
}

const ModalWildcards: React.FC<IProps> = ({ setIsModalWildcardsHidden, socket, properties }) => {
  const [wildcards, setWildcards] = useState<any>(getWildcards());
  const [selectedCardId, setSelectedCardId] = useState<number>();
  const [selectedSet, setSelectedSet] = useState<number>();

  function getWildcards() {
    let wildcards = [];
    for (let propertySet of properties) {
      for (let card of propertySet.cards) {
        card = card as IPropertyWildcard;
        if (card.setOne !== undefined) {
          // Create an object.
          let obj = {
            card: card,
            isRotated: !card.isAllSets && propertySet.set === card.setTwo,
            isAllSets: card.isAllSets,
            set: undefined
          };
          wildcards.push(obj);
        }
      }
    }
    return wildcards;
  }

  function renderSetName(set: number) {
    switch (set) {
      case undefined:
        return 'UNCHANGED';
      case 0:
        return 'BROWN';
      case 1:
        return 'LIGHT BLUE';
      case 2:
        return 'PINK';
      case 3:
        return 'ORANGE';
      case 4:
        return 'RED';
      case 5:
        return 'YELLOW';
      case 6:
        return 'GREEN';
      case 7:
        return 'BLUE';
      case 8:
        return 'STATION';
      case 9:
        return 'UTILITY';
      default:
        return 'Uh oh!';
    }
  }

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Swap</h3>
      <h2 className='action-modal__title'>Wild Cards</h2>
      <div className='properties properties--modified cheeky-margin-top'>
        {wildcards.map((obj: any) => (
          <div key={obj.card.id} className='card-wrapper'>
            <div
              onClick={() => {
                if (obj.card.id === selectedCardId) {
                  setSelectedCardId(undefined);
                  return;
                }

                setSelectedCardId(obj.card.id);
              }}
              className={`card ${obj.isRotated ? 'card--rotated' : ''} ${
                selectedCardId === obj.card.id ? 'highlighted-yellow' : ''
              }`}
            >
              <PropertyWildcard card={obj.card as IPropertyWildcard} />
            </div>
            {obj.isAllSets && <p className='card-wrapper-label'>{renderSetName(obj.set)}</p>}
          </div>
        ))}
      </div>
      <div className='modal--card__button-container'>
        <select
          onChange={(event) => {
            if (selectedCardId === undefined) return;

            setSelectedSet(parseInt(event.target.value));

            let wildcardsCopy = [...wildcards];

            for (let obj of wildcardsCopy) {
              if (obj.card.id === selectedCardId) {
                // if (!obj.isAllSets) return;
                obj.set = parseInt(event.target.value);
                break;
              }
            }

            setWildcards(wildcardsCopy);
          }}
          value={selectedSet}
          disabled={selectedCardId === undefined || selectedCardId < 38}
        >
          <option value='0'>Brown</option>
          <option value='1'>Light Blue</option>
          <option value='2'>Pink</option>
          <option value='3'>Orange</option>
          <option value='4'>Red</option>
          <option value='5'>Yellow</option>
          <option value='6'>Green</option>
          <option value='7'>Blue</option>
          <option value='8'>Station</option>
          <option value='9'>Utility</option>
        </select>
        <button
          onClick={() => {
            if (selectedCardId === undefined) return;

            let wildcardsCopy = [...wildcards];

            for (let obj of wildcardsCopy) {
              if (obj.card.id === selectedCardId) {
                obj.isRotated = !obj.isRotated;
                break;
              }
            }

            setWildcards(wildcardsCopy);
          }}
          className='modal--card__button button--rotate'
          type='button'
          disabled={selectedCardId === undefined || selectedCardId > 37}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' height='30px'>
            <path
              d='M21.9 7.6C20 5.8 17.6 4.8 15 4.8c-4.7 0-8.7 3.2-9.8 7.7-.1.3-.4.6-.7.6H1c-.5 0-.8-.4-.7-.9C1.6 5.3 7.7 0 15 0c4 0 7.7 1.6 10.4 4.2L27.5 2c.9-.9 2.5-.3 2.5 1v8.1c0 .8-.6 1.5-1.5 1.5h-8.1c-1.3 0-1.9-1.6-1-2.5l2.5-2.5zM1.5 17.4h8.1c1.3 0 1.9 1.6 1 2.5l-2.5 2.5c1.9 1.8 4.3 2.7 6.9 2.7 4.7 0 8.7-3.2 9.8-7.7.1-.3.4-.6.7-.6H29c.5 0 .8.4.7.9C28.4 24.7 22.3 30 15 30c-4 0-7.7-1.6-10.4-4.2L2.5 28c-.9.9-2.5.3-2.5-1v-8.1c0-.8.6-1.5 1.5-1.5z'
              fill='#fff'
            />
          </svg>
        </button>
        <button
          onClick={() => {
            socket.emit(SocketEvent.SWAP_WILDCARDS, wildcards);
            setIsModalWildcardsHidden(true);
          }}
          className='modal--card__button button--play'
          type='button'
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ModalWildcards;
