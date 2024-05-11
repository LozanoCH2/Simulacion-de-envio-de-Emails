document.addEventListener('DOMContentLoaded', function(){


    const email={
        email:'',
        emailCC:'',
        asunto:'',
        mensaje:''
    }

    const inputEmail= document.querySelector('#email');
    const inputEmailCC= document.querySelector('#emailCC');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje= document.querySelector('#mensaje');
    const formulario=document.querySelector('#formulario');
    const btnSubmit=document.querySelector('#formulario button[type="submit"]');
    const btnReset=document.querySelector('#formulario button[type="reset"]');
    const spinner=document.querySelector('#spinner');

    

    inputEmail.addEventListener('blur', validar);
    inputEmailCC.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFomulario();  
    });

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetFomulario();

            const alertaExito=document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2','text-center','rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent='Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(()=>{
                    alertaExito.remove();
            },3000);
        },3000)

    }

    //Desde la funcion de validar

    function validar(e)
    {
        
        if(e.target.value.trim() === '')
        {
           if(e.target.id==='emailCC'){ 
           delete email.emailCC;
           limpiarAlerta(e.target.parentElement);
            return;   }
            mostrarAlerta(`El elemento ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name]='';
            comprarEmail();
            return;
        } 
     
        if((e.target.id ==='email' || e.target.id==='emailCC' ) && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name]='';
            comprarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name]=e.target.value.trim().toLowerCase();
        comprarEmail();
    }

    function mostrarAlerta(mensaje, referencia){

        //Comprobar si la alerta ya 
        
        limpiarAlerta(referencia);
        const error=document.createElement('P');
        error.classList.add('bg-red-600', 'text-white','p-2', 'text-center');
        error.textContent=` ${mensaje}`;
        

        //Inyectar el error al formulario

        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia){
        const alerta=referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const  regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado=regex.test(email);
        return resultado;
      

    }

    function comprarEmail(){
       
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled=true;
            return;
        }
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled=false;
    }

    function resetFomulario(){
        email.email='';
        email.asunto='';
        email.mensaje='';

        

        formulario.reset();
        comprarEmail();
    }
});


