    

    function myFunction(): void{
      const welcomeMessage = document.getElementById('welcomeMessage') as HTMLInputElement;
      const firstNameHTML = document.getElementById('firstName') as HTMLInputElement;
      const firstName : String = firstNameHTML.value;
      const lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
      welcomeMessage.textContent = `Welcome, again ${firstName} ${lastName}!`;
    }