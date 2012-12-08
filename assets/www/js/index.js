var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
		app.report('deviceready');
		//document.addEventListener("backbutton", BackButton, false);		
		//onclick="onDateFocus(this)";
		//document.getElementById("home").innerHTML += '<input class="DatePicker" value="check" onclick="onDateFocus(this)" readonly="readonly"></input>';
		DataHandling();
		GetNamesView();
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);
        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
    }
};
function onDateFocus(currentField)
	{
	    var myNewDate = Date.parse(currentField.value) || new Date();    
	    	    
		window.datePicker.show({
	        date : myNewDate,
	        mode : 'date', // date or time or blank for both
	        allowOldDates : true
	    }, function(returnDate) {
	        var newDate = new Date(returnDate);
	        currentField.value = newDate.toString("dd/MMM/yyyy");

	        // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
	        currentField.blur();
	    });
	}
function BackButton()
{
	var r = confirm('Exit?');
	if(r == true)
		navigator.app.exitApp();	
}
function DataHandling()
{
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(populateDB, errorCB, successCB);	
}
function populateDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS Users');
     tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id integer Primary Key, name)');
     tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Abhijeet Goel")');
     tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Divyanshu Goel")');
	 tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Drashti Goel")');
	 tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Shiwani Sharma")');
	 tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Neha Raghuvanshi")');
	 tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Atul Goel")');
	 tx.executeSql('INSERT INTO Users (id, name) VALUES (NULL, "Akriti Goel")');
     tx.executeSql('DROP TABLE IF EXISTS Entry');
     tx.executeSql('CREATE TABLE IF NOT EXISTS Entry (eid integer Primary Key,id , date,purpose,amount,type)');
	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,1, "2012-04-12","Eggs",15,"D")');
 	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,1, "2012-01-11","Hen",10,"C")');
 	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,3, "2012-24-10","Potato",15,"C")');
  	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,2, "2011-14-09","Chicken",250,"D")');
  	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,2, "2011-07-12","Disc",45,"C")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,1, "2011-14-07","Di",15,"C")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,1, "2011-09-01","Discoooo",85,"C")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,4, "2011-04-02","Discsdss",45,"D")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,5, "2011-04-03","Discewewew",85,"C")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,6, "2012-04-12","Discwewew",85,"C")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,7, "2012-23-09","Discqwqwq",225,"D")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,6, "2012-27-10","Discqwqwq",105,"D")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,5, "2012-29-11","Disc",35,"D")');
   	 tx.executeSql('INSERT INTO Entry (eid,id, date,purpose,amount,type) VALUES (NULL,5, "2012-20-11","Disc",75,"C")');
}
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}
function successCB() {
    //alert("success!");
}
function Type(type)
{
	if(type == "C")
		{
			return "red";
		}
	else if(type == "D")
		{
			return "green";
		}
}
function GetDetailView(id)
{
	document.getElementById("newForm").innerHTML = '';
	document.getElementById("Add").innerHTML = '<a href="javascript:AddNewEntry('+id+')">Add New</a>';
	document.getElementById("names").innerHTML = '';
	document.getElementById("names").innerHTML += '<div id="heading">'+ GetNameById(id)+'</div>';
	
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Entry WHERE id=? order by date desc',[id],function(tx, results)
		{
			total = 0;
			document.getElementById("names").innerHTML += '<div class="row-fluid" id="info"><div class="span3"><b>Date</b></div><div class="span5"><b>Purpose</b></div><div class="span2"><b>Amt</b></div></div>';
			
			for( var i=0;i< results.rows.length;i++)
			{
				document.getElementById("info").innerHTML +=
				'<div class="row-fluid"><div class="span3">'+results.rows.item(i).date.slice(5,10)+'</div><div class="span5" style="word-wrap:break-word;">'+results.rows.item(i).purpose+'</div><div class="span2">' + results.rows.item(i).amount+'</div><div class="span2"><i class="icon-trash" onclick="javascript:DeleteEntry('+results.rows.item(i).eid +"," +results.rows.item(i).id +')"></i></div></div>';
				//<i class="icon-edit" onclick="javascript:EditEntry('+results.rows.item(i).eid+',' +results.rows.item(i).id +')"></i>
				if( Type(results.rows.item(i).type) == "red")
				{
					total -=results.rows.item(i).amount;			
				}
				else if( Type(results.rows.item(i).type) == "green")
				{
					total +=results.rows.item(i).amount;
				}
			}
			document.getElementById("info").innerHTML += '<div class="row-fluid"><div class="span3">Total</div><div class="span6">'+total+'</td></tr>';
			document.getElementById("names").innerHTML += "<br><a href='javascript:GetNamesView()'>Back</a>"; 
			document.getElementById("names").innerHTML += '</table>';			
		},errorCB);
	}, errorCB);
}
function GetNamesView()
{
	document.getElementById("newForm").innerHTML = '';
    document.getElementById("Add").innerHTML = '<a href="javascript:AddNewUser()">Add New</a>';
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Users order by name COLLATE NOCASE;',[],function(tx,results){
			var names = Array();		
			document.getElementById("names").innerHTML = "";
			for( var i=0;i< results.rows.length;i++)
			{
				str = 'javascript:GetDetailView('+results.rows.item(i).id+')';
				document.getElementById("names").innerHTML += "<div class='row-fluid'><div class='span1'></div><div class='span7'><a href='"+str+"'>"+ results.rows.item(i).name+"</a></div><div class='span2 offset2'><i class='icon-trash icon-large' onclick='javascript:DeleteUser("+results.rows.item(i).id +")'></i></div></div><div class='divider'></div>";
				//<div class='spacer'></div><i class='icon-edit' onclick='javascript:EditUser("+results.rows.item(i).id+")'></i>
			}
		},errorCB);
	},errorCB);
}
function GetNameById(id)
{	
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Users WHERE id=?',[id],function(tx,results){
			document.getElementById("heading").innerHTML = '';
			document.getElementById("heading").innerHTML += results.rows.item(0).name;			
			},errorCB);
	},errorCB);
}
function AddNewEntry(id)
{
	document.getElementById("newForm").innerHTML += '<form id="newEntry" action="javascript:EntryForm('+id+')" method="post">Date:<input type="date" id="day"/><input type="text" id="purpose" placeholder = "Purpose"/><input type="number" id="amt" placeholder="Amount"/>Type<select><option value="C">Credit</option><option value="D">Debit</option></select><input type="Submit" value="Add"/></form></br>';
}
function AddNewUser()
{
	document.getElementById("Add").innerHTML = '';
	document.getElementById("newForm").innerHTML += '<form id="newUser" action="javascript:UserForm()" method="post"><input type="text" id="name" placeholder="Name"/><input type="Submit" value="Add"/><button value="Cancel" onclick="CancelNewUser()"></button></form></br>';
}
function CancelNewUser()
{
	GetNamesView();
}
function EntryForm(id)
{
	date = document.getElementById("newEntry").elements[0].value;
	purpose = document.getElementById("newEntry").elements[1].value;
	amt = parseInt(document.getElementById("newEntry").elements[2].value);
	type = document.getElementById("newEntry").elements[3].value;
		
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
	tx.executeSql('INSERT INTO Entry(eid,id, date,purpose,amount,type) VALUES(NULL,?,?,?,?,?)',[id,date,purpose,amt,type],function(tx,results){
			document.getElementById("newForm").innerHTML = '';
			//document.getElementById("heading").innerHTML = '';
			//document.getElementById("heading").innerHTML += results.rows.item(0).name;
			GetDetailView(id);
			},errorCB);
	},errorCB);
}
function UserForm()
{
	name = document.getElementById("newUser").elements[0].value;
	
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO Users(id,name) VALUES(NULL,?)',[name],function(tx,results){
			document.getElementById("newForm").innerHTML = '';
			//document.getElementById("heading").innerHTML = '';
			//document.getElementById("heading").innerHTML += results.rows.item(0).name;
			GetNamesView();
			},errorCB);
	},errorCB);
}
function DeleteUser(id)
{
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM Users where id = ?',[id],function(tx,results){	
			//document.getElementById("heading").innerHTML = '';
			//document.getElementById("heading").innerHTML += results.rows.item(0).name;
			GetNamesView();
			},errorCB);
	},errorCB);
}
function DeleteEntry(eid,id)
{
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM Entry where eid = ?',[eid],function(tx,results){	
			//document.getElementById("heading").innerHTML = '';
			//document.getElementById("heading").innerHTML += results.rows.item(0).name;
			GetDetailView(id);
			},errorCB);
	},errorCB);
}
/*function EditUser(name,id)
{
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('UPDATE Users(id,name) SET name = ? where id = ?',[name,id],function(tx,results){
			//document.getElementById("heading").innerHTML = '';
			//document.getElementById("heading").innerHTML += results.rows.item(0).name;
			GetNamesView();
			},errorCB);
	},errorCB);
}
function EditEntry(id)
{
	var db = window.openDatabase("BAHI", "1.0", "BAHI DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM Users where id = ?',[id],function(tx,results){	
			//document.getElementById("heading").innerHTML = '';
			//document.getElementById("heading").innerHTML += results.rows.item(0).name;
			GetDetailView(id);
			},errorCB);
	},errorCB);
}*/