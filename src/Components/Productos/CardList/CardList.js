import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

function CardList ({ productos }) {

	return (
		<div>
			{
				productos.map((producto) => {
					return (
						<div className="productos-container" >
							<Card
								key={producto.id}
								id={producto.id}
								nombre={producto.nombre}
								descripcion={producto.descripcion}
								precio={producto.precio}
								cantidad_en_stock={producto.cantidad_en_stock}
							/>
						</div>
					);
				})
			}
		</div >
	);
}

export default CardList;