module.exports = function toReadable (number) {
    let string = number.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, int, i, word, words;

        /* Remove spaces and commas */
        string = string.replace(/[, ]/g,"");

        /* Is number zero? */
        if( parseInt( string ) === 0 ) {
            return 'zero';
        }
        
        /* Array of units as words */
        units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
        
        /* Array of tens as words */
        tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
        
        /* Array of scales as words */
        scales = [ '', 'thousand', 'million', 'billion' ];
        
        /* Split user argument into 3 digit chunks from right to left */
        start = string.length;
        chunks = [];
        while( start > 0 ) {
            end = start;
            chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
        }
        
        /* Check if function has enough scale words to be able to stringify the user argument */
        chunksLen = chunks.length;
        if( chunksLen > scales.length ) {
            return '';
        }
        
        /* Stringify each integer in each chunk */
        words = [];
        for( i = 0; i < chunksLen; i++ ) {
            
            chunk = parseInt( chunks[i] );
            
            if( chunk ) {
                
                /* Split chunk into array of individual integers */
                int = chunks[i].split( '' ).reverse().map( parseFloat );
            
                /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                if( int[1] === 1 ) {
                    int[0] += 10;
                }
                
                /* Add scale word if chunk is not zero and array item exists */
                if( ( word = scales[i] ) ) {
                    words.push( word );
                }
                
                /* Add unit word if array item exists */
                if( ( word = units[ int[0] ] ) ) {
                    words.push( word );
                }
                
                /* Add tens word if array item exists */
                if( ( word = tens[ int[1] ] ) ) {
                    words.push( word );
                }
                                                
                /* Add hundreds word if array item exists */
                if( ( word = units[ int[2] ] ) ) {
                    words.push( word + ' hundred' );
                }
                
            }
            
        }
        
        return words.reverse().join( ' ' );
        
    }
