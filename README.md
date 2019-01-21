# Shift-X Character Sheet

this is a roll20 character sheet for shift-x. 
it is also a testing framework 

## Design notes

for the character fields like origin and nemesis I'd like to make them more like large textareas
make a class that is field-double

no powerset name label. have to do placeholder text. Also, should character name has a special place with bigtime text?

I like how the onenote version of the sheet I did is. though things are not grouped together all that well. 

## Troubles

Our css must have a .sheet- prefix for all classes. but this will be automatically added to the html. 

Thankfully, we can include the sheet- prefix in the html classes and it will added as needed, not blindly concatinated, so we can use sheet- through out and stuff test our character sheet outside of roll 20. OMG. I just about had a fit.  