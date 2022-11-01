import './Paginado.css';


export default function Paginado ({ dogPerPage, allDogs, paginado, currentPage}){
    console.log('paginado --->', paginado);
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allDogs/dogPerPage); i++){
        pageNumbers.push(i );
    }

    // este componente renderiza los numeros de pagina
    return (
        <div>
            <ul className="paginado">
                {
                    pageNumbers && pageNumbers.map(number => (
                        <button 
                            className={number === currentPage ? 'btn_paginado_active' : 'btn_paginado'} 
                            onClick={() => paginado(number)} 
                            key={number}
                        >
                            {number} 
                        </button>
                    ))
                }
            </ul>
        </div>
    )
}