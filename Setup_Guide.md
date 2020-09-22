Jared Vitug | Movie App - Setup Guide

I deployed this application with firebase(https://movie-app-845d8.firebaseapp.com).
Since the user is pre-defined and there wasn't a need for a registration/login page,
I kept the data on the client side, saving the user's info in localStorage.  This way,
each user who accesses the site will have their own unique set of movies to mark/unmark
that they own.

To access the app: 
	- To ACCESS the app, go to the above url (https://movie-app-845d8.firebaseapp.com)
	  in a browser that is NOT in incognito mode - incognito mode will dump the data
	  from localStorage after the browser is closed. 

	- To run the app, you must have JavaScript enabled.
	
	- To SEARCH for movies, type the desired keyword in the searchbar
	  then select the "Search" button. The first 10 (or less) results from 
          TMDb will appear in the table, and the number of total results will
          appear below the table.

	- To MARK/UNMARK that you own a movie, check the checkbox beside that movie. 
	  To mark/unmark all movies in the table, check/uncheck the checkbox
	  at the top left cell of the table labeled "Owned?."

	- To SAVE your movies, after selecting/deselecting which movies you own,
	  click the "Save Movies" button.  Upon saving, an alert will appear
	  telling you your movies have been saved.  Any changes to checkboxes 
	  without clicking "Save Movies" will not be saved.

	- Once your movies have been saved, whenever your saved movies appear in 
	  the search table, they will be marked as owned.

	- Because user data is stored in localStorage on the client side, you can
	  only access data from your machine.
	 