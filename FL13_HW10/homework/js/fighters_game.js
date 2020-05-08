const _100perc = 100;

function Fighter (obj) {
	let name = obj.name;
	let damage = obj.damage;
	let hp = obj.hp;
	let totalHp = obj.hp;
	let strength = obj.strength;
	let agility = obj.agility;
	let wins = 0;
	let loses = 0;

	return {
		getName: () => {
			return name;
		},

		getDamage: () => {
			return damage;
		},

		getStrength: () => {
			return strength;
		},

		getAgility: () => {
			return agility;
		},

		getHealth: () => {
			return hp;
		},

		logCombatHistory: () => {
			console.log(`Name: ${name}, Wins: ${wins}, Loses: ${loses}`)
		},

		heal : (healHp) => {
			if( hp + healHp <= totalHp ) {
				hp += healHp;
			} else {
				hp = totalHp;
			}
		},

		addWin: () => {
			wins++;
		},

		addLoss: () => {
			loses++;
		},

		dealDamage: (dmg) => {
			if(hp - dmg < 0) {
				hp = 0;
			} else {
				hp -= dmg;
			}
		},

		attack: (anotherFighter) => {
			const anotherFighterStrength = anotherFighter.getStrength();
			const anotherFighterAgility = anotherFighter.getAgility();
			const chanceToAttack = _100perc - (anotherFighterAgility + anotherFighterStrength);
			const attackNumber = Math.floor(Math.random() * _100perc + 1);
			if(attackNumber <= chanceToAttack) {
				anotherFighter.dealDamage(damage);
				console.log(`${name} makes ${damage} damage to ${anotherFighter.getName()}`);
			} else {
				console.log(`${name} attack missed`);
			}
		}
	}
}

function battle(Fighter1, Fighter2) {
	if(Fighter1.getHealth() > 0 && Fighter2.getHealth() > 0) {
		Fighter1.attack(Fighter2);
		if(Fighter2.getHealth() > 0) {
			Fighter2.attack(Fighter1);
			if(Fighter1.getHealth() > 0) {
				battle(Fighter1, Fighter2);
			} else {
				console.log(`${Fighter2.getName()} has won!`);
				Fighter2.addWin();
				Fighter1.addLoss();
			}
		} else {
			console.log(`${Fighter1.getName()} has won!`);
			Fighter1.addWin();
			Fighter2.addLoss();
		}
	} else {
		const str = ' is dead and can\'t fight';
		Fighter1.getHealth()? console.log(`${Fighter2.getName()}${str}`) 
							: console.log(`${Fighter1.getName()}${str}`);
	}
}