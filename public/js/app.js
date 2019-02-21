function checkButton(e){
        if(!((e>=48&&e<=57)||(e>=65&&e<=90)||(e>=97&&e<=127))) return true;
        const keys = document.querySelectorAll('.key');
        for(let i=0; i<keys.length; i++){
            if(e==keys[i].dataset.key) return true;
        }
        return false;
    }
    function buildBody(){
        let d = document.createElement('div');
        d.className = 'keys';
        document.body.appendChild(d);
        const arr = document.querySelectorAll('.key');
        for(let i=0; i<9; i++){
            let div = document.createElement('div');
            let input = document.createElement('input');
            let val = prompt('wprowadz klawisz od A do Z lub od 0 do 9');
            let audio = document.createElement('audio');
            var str=val.toUpperCase();
            val = val.toUpperCase().charCodeAt();
            while(checkButton(val)){
                val = prompt('znak jest niedozwolony lub jest juz uzywany podaj inny!');
                str = val;
                val = val.toUpperCase().charCodeAt();
            }
            div.className = 'key';
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'audio/*');
            input.setAttribute('id', 'recorder');
            input.setAttribute('onclick', 'sound(this)');
            input.setAttribute('data-key', val);
            div.setAttribute('data-key', val);
            d.appendChild(div);
            div.appendChild(input);
            let kbd = document.createElement('kbd');
            let letter = document.createTextNode(str.toUpperCase());
            kbd.appendChild(letter);
            div.appendChild(kbd);
            audio.setAttribute('data-key', val);
            document.body.appendChild(audio);
        }

        
    }

    function sound(e){
        const input = e;
        console.log(e);
        const dataKey = e.dataset.key;
        console.log(dataKey);
        input.onchange = function(f){
        const sound = document.querySelector(`audio[data-key="${dataKey}"]`);
            console.log(sound);
            sound.src = URL.createObjectURL(this.files[0]);
    }
    }

    function sounds(e){
        const recorder = document.getElementById('recorder');
        const file = recorder.files;
        file.push(e);
        const dataKey = recorder.dataset.key;
        const audio = document.querySelector('audio');
        for(let i=0; i<audio.length; i++){
            if(audio[i].dataset.key == dataKey) {
                audio[i].src =  URL.createObjectURL(file);
            }
        }
    }
    
    function playSound(e){
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const keys = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if(audio==null) return;
        audio.play();
        audio.currentTime=0;
        keys.classList.add('playing');
        setTimeout(function(){keys.classList.remove('playing');},70);
    }
    function writeKeys(e){
        if(e.keyCode==13){
            const keys = document.querySelectorAll('.key');
        var every ='';
        for(let i=0; i<keys.length; i++){
            every+=String.fromCharCode(keys[i].dataset.key)+',';
            console.log(String.fromCharCode(keys[i].dataset.key));
        }
        alert('Przypisane klawisze to: '+every);
        }
        
    }
    function removeInput(e){
        if(e.keyCode==27){
            const input = document.querySelectorAll('input');
            if(input[0].classList.contains("input")){
                for(let i=0; i<input.length; i++){
                    input[i].classList.remove('input');
                }
            }
        else{
            for(let i=0; i<input.length; i++){
                    input[i].classList.add('input');
                }
            }
        }
    }
        
    const arr = ['sounds/clap.wav','sounds/hihat.wav', 'sounds/kick.wav', 'sounds/openhat.wav','sounds/boom.wav', 'sounds/ride.wav','sounds/snare.wav','sounds/tom.wav','sounds/tink.wav'];

    window.addEventListener('onload',buildBody(arr));
    //const recorder = document.getElementById('recorder');
    //window.addEventListener('onchange', sounds()); 
    window.addEventListener('keydown', playSound);
    window.addEventListener('keydown', writeKeys);
    window.addEventListener('keydown', removeInput);









