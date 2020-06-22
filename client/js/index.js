window.addEventListener( 'DOMContentLoaded', async ( event ) => { 
   
    //clear display 
    const parent = document.querySelector( '#display-result' )
    parent.innerHTML = ''

    const loader = document.querySelector( '#loading' )
    
    
   

    /* update UI */

    const updateUi = ( counter, data ) => {

        
        const card = document.createElement( 'div' )
        if ( counter > 2 )
        {
            card.setAttribute( 'class', 'card top' )
        } else
        {
            card.setAttribute( 'class', 'card' )
        }
        card.setAttribute( 'data-card-username', `${ data.username }` )
        card.innerHTML = `
                <div class="card-side-a">
                    <p class="card-name">
                        ${data.fullname }
                    </p>
                    <p class="handle">${data.username }</p>
                </div>
                <div class="card-side-b">
                    <div class="score">
                        <span>${data.totalpoint }</span>
                    </div>
                </div>
            `;

            parent.appendChild( card )
       
    
    }

    const fullDataUpdate = ( data ) => {
        let counter = 0
        ( typeof data === 'object' ) ? ''
            : (
             //counter for top 3
            data.forEach( da => {

                updateUi( counter, da )

                ++counter
            } ) 
        )
        
    }
    
    
    const loading = data => {

        ( data === false )
            ? loader.classList.add( 'dontShow' )
            : (
                loader.classList.contains('dontShow') ? loader.classList.remove( 'dontShow' ) : ''
            )
        
    }
    

    loading( true )
    let clientTempStore = [ ];
    
    const myPromise = async () => {
        return new Promise( async ( resolve, reject ) => {
            await fetch( '/api/getdata' )
                .then( res => res.json() )
                .then( d => resolve( d ) )
            .catch(e => reject(e))
        })
    }
    /* getData() */  
    /* Function to GET Project Data */
        try
        {
            myPromise()
            .then( data => {
                    //console.log(data)
                (data.length > 0) ? loading( false ) : ''
                clientTempStore = data
                //fullDataUpdate(data)
                    data.forEach( d => {
                        const card = document.createElement( 'div' )
                    card.setAttribute( 'data-card-username', `${ data.username }` )
                    card.innerHTML = `
                        <div class="card-side-a">
                            <p class="card-name">
                                ${data.fullname }
                            </p>
                            <p class="handle">${data.username }</p>
                        </div>
                        <div class="card-side-b">
                            <div class="score">
                                <span>${data.totalpoint }</span>
                            </div>
                        </div>
                    `;

                    parent.appendChild( card )
                    })
                
            } ) 

        } catch (error) {
            alert( error );
        }

    /* Debounce function */
    function debounce ( a, b, c ) { var d, e; return function () { function h () { d = null, c || ( e = a.apply( f, g ) ) } var f = this, g = arguments; return clearTimeout( d ), d = setTimeout( h, b ), c && !d && ( e = a.apply( f, g ) ), e } };

    handleSearchChange = debounce( ( event ) => {
        const searchText = event.target.value.toLowerCase()
            parent.innerHTML = ''
            console.log( searchText )
            const dd = clientTempStore.find( d => d.username.toLowerCase() == `@${ searchText }` )
            

            if ( searchText === '' )
            {
                fullDataUpdate( clientTempStore );
            } else
            {
                typeof dd !== 'undefined' ? updateUi( 0, dd ) : ''
            }
    }, 500 )
    
    const searchInput = document.querySelector( '#search' )
    searchInput.addEventListener( 'keyup', handleSearchChange)
        
    
    
    
} );
