
# hackingLock

:octocat: :octocat: :octocat: 

---

Project's Author : thibaultDup

## Introduction :

[ **hackingLock** ] is my second Cfx script from scratch, their might be some bugs don't hesitate to contact me regarding those.

This script allows you to open locked players car by "hacking" them. You approach a locked car press "H" and it will popup the tablette UI 
wich as multiple elements (to simulate a hack) in wich their is some informations you need to find in order to hack successfully the car and unlock her.
To help you their are some comments in the fake python code that you need to modify to do the hack, if you follow the clues in the comments you should succeed.
(Some demo videos will be aviable in the realese post on the Cfx forums to help the firs time users)



## Requirements:

This script doesn't have any requirements, it can work with or without any frameworks.
Regarding the script you use to lock cars it might not work for all of them, but the code I wrote should work with the majority of them. (I did the testing with the [ esx_carlock ] script)


## Installation: 


1. Download the ZIP, extract it, rename it hackingLock (if necessary)
2. Put the folder in the resources folder
3. Add this following line to the server.cfg : ensure hackingLock

## Config:

1. **Change Key** : The default key to take the Ipad out is "H", you can change this in line 39 of [ client/main.lua ] {1}
2. **Add new cars** : I added all the car from the default game, add-on cars can totaly be hacked with my script but you need to create an entry for them.
To do so you need to *add the car and create a random AP* in my [ APModelList[] ] (javascript array) that you can find in [ **/html/script.j** ]. I will add the possibility to do it in the config file later {2}


## TODO LIST:

- Priority - Fix the sizing issues for the people with 1280*720 resolution, or the ones that uses weirder resolutions
- Make a [ **config.lua** ] file to allow players to : change the key to press {1} , set time of APFrequency change, allow user to add other cars more easily {2}.
- Maybe make a location file to translate the comments in the fake python script (for non-english speakers)

## Other: 

If you encounter any issues, don't hesitate to report them :smiley_cat:

---