window.addEventListener( 'DOMContentLoaded', async ( event ) => { 
   
    //clear display 
    const parent = document.querySelector( '#display-result' )
    parent.innerHTML = ''

    const loader = document.querySelector( '#loading' )
    
    
    /* Function to POST data */
    const postData = async ( url = '', data = {} ) => {
    try
    {
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        };
        
        try {
            const resp = await fetch( url, options )
            const respData = resp.json();

            return respData;
            
        } catch (error) {
            console.log( error );
        }
        
    } catch ( error )
    {
        alert( "error: ", error );

    }
}

    

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

    const fullDataUpdate = (dat) => {
        let counter = 0; //counter for top 3
        dat.forEach( da => {

            updateUi( counter, da )

            ++counter
        } ) 
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
    
    
    /* getData() */  
    /* Function to GET Project Data */
        try
        {
            await fetch( '/api/getdata' )
            .then(res => res.json())
                .then( ress => {
                loading( false )
                //clientTempStore = dataR
                let counter = 0; //counter for top 3
                ress.forEach( data => {

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

                    ++counter
                } )
            } ) 

        } catch (error) {
            alert( error );
        }

    /* Debounce function */
    function debounce ( a, b, c ) { var d, e; return function () { function h () { d = null, c || ( e = a.apply( f, g ) ) } var f = this, g = arguments; return clearTimeout( d ), d = setTimeout( h, b ), c && !d && ( e = a.apply( f, g ) ), e } };

    /*handleSearchChange = debounce( ( event ) => {
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
    }, 500 )*/
    
    const searchInput = document.querySelector( '#search' )
    //searchInput.addEventListener( 'keyup', handleSearchChange)
        
    
    
    
} );
