class Bactria {
    gens = []
    enzymes = []
    materials = []
    
    getMassOfMaterial(material) {
        var res = 0;
        for(var i = 0; i < this.materials.lenght; i++) {
            if(this.materials[i].name === material.name) {
                res += this.materials[i].mass;
            }
        }
        return res;
    }

    getMassOfEnzyme(enzyme) {
        var res = 0;
        for(var i = 0; i < this.enzymes.lenght; i++) {
            if(this.enzymes[i].name === enzyme.name) {
                res += this.enzymes[i].mass;
            }
        }
        return res;
    }

    consumeEnzyme(enzyme, output) {
        for(var i = 0; i < this.enzymes.length; i++) {
            if(enzyme.name === this.enzymes[i].name) {
                this.enzymes[i].mass -= output;
            }
        }
    }

    consumeMaterial(material, output) {
        for(var i = 0; i < this.materials.length; i++) {
            if(material.name === this.materials[i].name) {
                this.materials[i].mass -= output;
            }
        }
    }

    refresh() {
        for(var i = 0; i < this.enzymes.length; i++) {
            for(var  j = i + 1; j < this.enzymes.length; j++) {
                if(this.enzymes[i].name === this.enzymes[j].name) {
                    this.enzymes[i].mass += this.enzymes[j].mass;
                    this.enzymes[j] = this.enzymes[-1];
                    this.enzymes.pop();
                    j --;
                }
            }
        }
        for(var i = 0; i < this.materials.length; i++) {
            for(var  j = i + 1; j < this.materials.length; j++) {
                if(this.materials[i].name === this.materials[j].name) {
                    this.materials[i].mass += this.materials[j].mass;
                    this.materials[j] = this.materials[-1];
                    this.materials.pop();
                    j --;
                }
            }
        }
    }
}

class Rule {
    enzymes = [];
    materials = [];
    new_materials = [];

    canSupply(bactria) {
        bactria.refresh();
        var minMaterial = Infinity;
        for(var i = 0; i < this.materials.lenght; i++) {
            if(bactria.getMassOfMaterial(this.materials[i]) < minMaterial) {
                minMaterial = bactria.getMassOfMaterial(this.materials[i]);
            }
        }
        var minEnzymes = Infinity;
        for(var i = 0; i < this.enzymes.lenght; i++) {
            if(bactria.getMassOfEnzyme(this.enzymes[i]) < minEnzymes) {
                minEnzymes = bactria.getMassOfEnzyme(this.enzymes[i]);
            }
        }
        return Math.min(minEnzymes, minMaterial);
    }

    supply(bactria) {
        bactria.refresh();
        const output = this.canSupply(bactria);

        this.enzymes.forEach(enzyme => {
            bactria.consumeEnzyme(enzyme, output);
        });

        this.materials.forEach(material => {
            bactria.consumeMaterial(material, output);
        });

        this.new_materials.forEach(material => {
            bactria.materials.push(new Material(material.name, output));
        });
    }



}

class Gene {
    name;
    time;
    target_enzyme_name;

    createNewEnzyme(bactria) {
        bactria.enzyme.push(new Enzyme(target_enzyme_name));
        bactria.refresh();
    }
}

class Material {
    name;
    mass;

    constructor(name, mass) {
        this.name = name;
        this.mass = mass;
    }
    constructor(name) {
        this.name = name;
        // TODO this.mass = ??;
    }

}

class LevelLoader {
    load(levelNumber) {
        ///json
        return level;
    }
}

class Level {
    enzymeConfig;
    //materialConfig;
}

class EnzymesConfig {
    
    static load() {

    }
}

class Enzyme {
    static enzymesConfig;

    name = "";
    mass;
    mass_decay;

    constructor(enzyme_name) {
        enzymesConfig = EnzymesConfig.load();
        this.name = enzyme_name;
        this.mass = enzymesConfig.getDefaultMass(enzyme_name);
        this.mass_decay = enzymesConfig.getDefaultDecay(enzyme_name);
    }

}



class GameState {
    
}
