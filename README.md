# Interchain Communication UI

DApp for controlling and illustrating flow of interchain communication

## Getting started

1. Configure and run parity client with chosen network.
2. A. For Windows, run (with GIT installed):
    
    ```
    sh init.sh 
    ```
    B. For UNIX systems, just run: 
    
    ```
    ./init.sh
    ```
3. Make sure you dist output folder has symbolic link to parity client dapps folder.
   Example for Windows: 
   
   ```
   mklink /D  "{path_to_chains_folder}\{chain_name}\dapps\dist"  "{app_folder}\dist"
   ``` 
4. To configure default accounts in networks and contracts' addresses edit src/config.json

## Authors
* **[Kirill Shatilov](http://www.shatilov.me)**
* **Jacob Heyder**
* **[Zac Wellmer](http://www.1984.ai)**
