# Evolving-web

This files contains a components called product-list, this's part of a simple Angular app. 

1. Initialy, Data is managed via the **NgRx store**, consuming Api rest services by Angular Services. 
2. I used Obeservables to have more control about my http request and transform my data too, implementig some rxjs operators like pipe and map.  
3. Pagination was created by myself to have more control with my data, using functions like **paginator**, **handlePage**, **saveCurrentPage**, **readCurrentPage** and **addActiveClass**. 

    In this way, **paginator** is responsible to create differents number pages. 

    **handlePage** is responsible to manage my information by lists of 10 products or items based on a selected number by user, this number is created by paginator function and data to manage is supplied by http request.

    **saveCurrentPage** and readCurrentPage are responsibles to save and read page number selected by user and load information based on it.

    Finally, **addActiveClass** is a simple function to toggle active class on page number selected. 
