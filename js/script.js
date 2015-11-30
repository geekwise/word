var array_of_words = new Array;
var array_list = new Array;

var input_box;
var unordered_list;
var list_element;
var number_of_children;

var active_list_item;
var previous_list_item;

var random_word;
var word = 'dog';
var unordered_word;

var player_word;

var list_element_letter;
var timer;
var timer_container;

var number_of_words;
var random_number;
var current_guess;

var array_of_letters = new Array;
var array_of_words = new Array;

var button;

var jumble_word = function(){
  
    while(typeof random_word === 'undefined'){
          pick_random_word();
    };
    
    
    
    array_of_letters = random_word.split('');
    
    randomize_array_order(array_of_letters);
    
    
    console.log(array_of_letters);
            
};


var word_status;


var check_player_guess = function(){
    
      //Set The Player's Word To An Empty Value
      current_guess = '';    
    
      //Update The Current Arrangement Of Letters
      //Save The Order To The New Player Word
      for(i=0;i<letter_container.children.length;i++){
          current_guess +=letter_container.children[i].textContent;
          letter_container.children[i].style.backgroundColor = 'lightcoral';
      };
    
      return current_guess;
    
}


var randomize_array_order = function(array_name){
    
    
    
    array_name.sort(function(){
                return .5 - Math.random();
        });
    
    
 
};


var pick_random_word = function(){
        
        number_of_words = array_of_words.length;        
            
        if(number_of_words > 0){
         
            random_number = Math.round(Math.random() * number_of_words);
            random_word = array_of_words[random_number];
            console.log(random_word);
        }
}



var check_word = function(){


        check_player_guess();    
        console.log(current_guess);

       

    
    
        if(current_guess === random_word){
            
            for(i=0;i<letter_container.children.length;i++){
                          current_guess +=letter_container.children[i].textContent;
                          letter_container.children[i].style.backgroundColor = 'lightseagreen';
                      };

        word_status = true;
        return true;

        
        }else{
            console.log('guess again')
           for(i=0;i<letter_container.children.length;i++){
                  current_guess +=letter_container.children[i].textContent;
                  letter_container.children[i].style.backgroundColor = 'lightcoral';
              };
         word_status = false;
            return false;
        }
};



var letter_container;

var randomize_word = function(){
    
    letter_container.innerHTML = '';
        
    pick_random_word();
    
    jumble_word();
     
    
  for(var i=0; i < array_of_letters.length; i++){
            list_element_letter = document.createElement('li');
            list_element_letter.textContent = array_of_letters[i];
      
      list_element_letter.setAttribute('draggable','true');
    
            list_element_letter.style.backgroundColor = 'lightcoral';
  
      
        list_element_letter.addEventListener('dragstart', function(event){
               previous_list_item = event.target;
	           event.dataTransfer.setData('text', event.target.textContent);
                      
                        event.target.style.backgroundColor = 'gold';
                        event.dataTransfer.setDragImage();
            
         });
        
          list_element_letter.addEventListener('dragover',function(event){
                event.preventDefault();
        });
                
          list_element_letter.addEventListener('drop',function(event){
              
              
              previous_list_item.textContent = event.target.textContent; 
              
              
              
              event.target.textContent = event.dataTransfer.getData('text');
              check_word();
              
              
              

        });
   
      
     
      
            
            letter_container.appendChild(list_element_letter);
            
  }
            
      
   check_player_guess();
    if(check_player_guess() === random_word){
            console.log('-------- run randomize again --------------');
            randomize_word();
    };
     
};

var number_of_seconds = 3;
var count_down;
var reset;
var score;
var score_container;

document.addEventListener('DOMContentLoaded',function(event){
    
    score = 0;
    score_container = document.querySelector('h2');
    
    
    letter_container = document.getElementById('letter_container');
    
    
    
    timer_container = document.querySelector('h1');
    
    
    
    
    
    
    
    
    button = document.querySelector('button');
    button.textContent = 'Shuffle Words';
    button.addEventListener('click',function(event){
    

        if(list_of_words.childElementCount > 0){
            clearInterval(count_down);

            randomize_word();

             number_of_seconds = 10;    
             count_down = setInterval(function(){


            if(number_of_seconds <= 0){

                timer_container.textContent = 'Out Of Time';
                clearInterval(count_down);

                  reset = setInterval(function(){
                        score --;
                        score_container.textContent = 'Score: ' + score;

                        button.click();
                        clearInterval(reset);
                    },2000);
                
                
            }else{
                timer_container.textContent =number_of_seconds;
                number_of_seconds--;

                if(check_word() === true){
                    timer_container.textContent = '+1 Point!';
                    clearInterval(count_down);
                    
                    reset = setInterval(function(){
                        score ++;
                        score_container.textContent = 'Score: ' + score;
                        button.click();
                        clearInterval(reset);
                    },2000);
                    
                }
            }


        },1000);



        }


        
        
    });
    
    
    /*
    ----------------------------
    */
    
    unordered_list = document.getElementById('list_of_words');

    input_box = document.getElementById('word_box');
    input_box.placeholder = 'Enter A Word Up To 10 Letters Long';
    input_box.style.width = '100%';
    input_box.setAttribute('maxlength',10);
    input_box.addEventListener('keydown',function(event){
     
    if(event.keyCode === 13){
     
        if(input_box.value.match(/\d|\W/)){
            input_box.value = '';
        }else{
            
     
                list_element = document.createElement('li');
                list_element.textContent = input_box.value;
            
                list_element.addEventListener('dblclick',function(event){
                   this.remove(); 
                });
            
                input_box.value = null;
                unordered_list.appendChild(list_element);

                array_of_words.push(list_element.textContent);    
        
            }
            
            
            
        }
        
    
    });
    
    
    
    
    
});    