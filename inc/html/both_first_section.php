<div class="munform">


<form id="firstForm" name="firstForm">
    <div class="first__section">

        <legend>
            IS THE BACKFLOW ASSEMBLY LOCATED AT A COMMERCIAL OR RESIDENTIAL PROPERTY?
        </legend>
        <div class="radio__btn radio__wrapper">
            <div>
                <input type="radio" id="typeChoice1"
                       name="type" required value="commercial">
                <label for="typeChoice1">Commercial</label>
            </div>
            <div>
                <input type="radio" id="typeChoice2"
                       name="type" value="residential">
                <label for="typeChoice2">Residential</label>
            </div>

        </div>
        <div>
           <div>
                <legend>CID:</legend>
                <div>
                    <input type="number"  id="CID" name="CID" />
                </div>
                <p>This can be found in the email or letter you received.</p>
           </div>
            <div>
                <legend>EMAIL:</legend>
                <div>
                    <input type="email"  id="email" name="email" />
                </div>
            </div>
        </div>
        
        <div class="bottom__buttons">
            <button type="submit" id ='sendOrganization'>Next page</button>
            <div class="loader hide">
            </div>
        </div>
    </div>
</form>